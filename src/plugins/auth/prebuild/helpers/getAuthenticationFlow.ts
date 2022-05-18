import {
  BaseRefreshTokenPayload,
  createAuthenticationFlow,
} from '../../authentication';
import { ClientPartials, Credentials, CredentialsPartials } from '../../types';
import { JWT } from '../../utils';
import { ClientModel, CredentialsModel } from '../models';

export function getAuthenticaionFlow<
  M extends CredentialsPartials.Meta = null,
  CT extends ClientPartials.Type = string,
  CP extends ClientPartials.Permissions = null,
  CM extends ClientPartials.Meta = null
>(
  credentialsModel: CredentialsModel<M>,
  clientModel: ClientModel<CT, CP, CM>,
  jwt: JWT<BaseRefreshTokenPayload>
) {
  return createAuthenticationFlow({
    authenticate: (login: string, password: string) =>
      credentialsModel.authenticate(login, password),

    createClient: (
      credentials: Credentials<M>,
      type: CT,
      permissions: CP,
      meta: CM
    ) => clientModel.create(type, credentials.id, permissions, meta),

    getClientById: (id: number) => clientModel.getById(id),

    createRefreshTokenPayload: (client) =>
      ({ id: client.id } as BaseRefreshTokenPayload),

    signRefreshToken: (payload: BaseRefreshTokenPayload) =>
      jwt.getToken(payload, { expiresIn: '1y' }),

    verifyRefreshToken: (token) => jwt.decodeToken(token),
  });
}
