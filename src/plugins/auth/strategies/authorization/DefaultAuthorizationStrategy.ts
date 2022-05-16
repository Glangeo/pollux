import { HTTPStatusCode } from 'src/api';
import { InternalException, ValidationException } from 'src/core';
import { CSRF, JWT } from '../../helpers';
import { IAuthorizationStrategy } from '../../interfaces/IAuthorizationStrategy';
import { ClientModel } from '../../models/ClientModel';
import { Client, ClientPartials } from '../../types';

export type AccessTokenPayload = {
  readonly id: number;
  readonly csrfToken: string;
};

export class DefaultAuthorizationStrategy<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> implements IAuthorizationStrategy<T, P, M>
{
  public constructor(
    protected readonly jwt: JWT<AccessTokenPayload>,
    protected readonly csrf: CSRF
  ) {}

  public async getAccessToken(
    model: ClientModel<T, P, M>,
    client: Client<T, P, M>
  ): Promise<string> {
    const csrfToken = this.csrf.getToken();
    const token = this.jwt.getToken(
      {
        id: client.id,
        csrfToken,
      },
      {
        expiresIn: '24d',
      }
    );

    const isSucceded = await model.updateCsrf(client.id, csrfToken);

    if (!isSucceded) {
      throw new InternalException({
        message: 'Could not update client.',
        meta: {
          description: [
            `Client.id: ${client.id}`,
            'Client CSRF token was not updated',
          ],
        },
      });
    }

    return token;
  }

  public async getClientByAccessToken(
    model: ClientModel<T, P, M>,
    token: string
  ): Promise<Client<T, P, M>> {
    const { id, csrfToken } = this.jwt.decodeToken(token);
    const client = await model.getById(id);

    if (client.csrfToken !== csrfToken) {
      throw new ValidationException({
        message: 'Access token is invalid.',
        meta: {
          errors: ['CSRF tokens do not match.'],
        },
        httpStatusCode: HTTPStatusCode.Unauthorized,
        publicInfo: {
          message: 'Access token is invalid.',
        },
      });
    }

    return client;
  }
}
