import { HTTPStatusCode } from 'src/api';
import { InternalException, ValidationException } from 'src/core';
import { CSRF, PBKDF2 } from '../../helpers';
import { JWT } from '../../helpers/JWT';
import { IAuthenticationStrategy } from '../../interfaces/IAuthenticationStrategy';
import { CredentialsModel } from '../../models/CredentialsModel';
import { Credentials, CredentialsPartials } from '../../types';

export type RefreshTokenPayload = {
  readonly id: number;
  readonly csrfToken: string;
};

export class DefaultAuthenticationStrategy<
  M extends CredentialsPartials.Meta = null
> implements IAuthenticationStrategy<M>
{
  public constructor(
    protected readonly pbkdf2: PBKDF2,
    protected readonly jwt: JWT<RefreshTokenPayload>,
    protected readonly csrf: CSRF
  ) {}

  public getPasswordSalt(): string {
    return this.pbkdf2.createSalt();
  }

  public getPasswordHash(password: string, salt: string): string {
    return this.pbkdf2.get(password, salt);
  }

  public async getRefreshToken(
    model: CredentialsModel<M>,
    credentials: Credentials<M>
  ): Promise<string> {
    const csrfToken = this.csrf.getToken();
    const refreshToken = this.jwt.getToken(
      {
        csrfToken,
        id: credentials.id,
      },
      {
        expiresIn: '1y',
      }
    );

    const isSucceded = await model.updateCsrf(credentials.id, csrfToken);

    if (!isSucceded) {
      throw new InternalException({
        message: 'Could not update credentials.',
        meta: {
          description: [
            `Credentials.id: ${credentials.id}`,
            'Credentials CSRF token was not updated',
          ],
        },
      });
    }

    return refreshToken;
  }

  public async getCredentialsByRefreshToken(
    model: CredentialsModel<M>,
    token: string
  ): Promise<Credentials<M>> {
    const { id, csrfToken } = this.jwt.decodeToken(token);
    const credentials = await model.getById(id);

    if (credentials.csrfToken !== csrfToken) {
      throw new ValidationException({
        message: 'Refresh token is invalid.',
        meta: {
          errors: ['CSRF tokens do not match.'],
        },
        httpStatusCode: HTTPStatusCode.Unauthorized,
        publicInfo: {
          message: 'Refresh token is invalid.',
        },
      });
    }

    return credentials;
  }
}
