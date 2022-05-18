import {
  AuthorizationFlow,
  BaseAccessTokenPayload,
  createAuthorizationFlow,
} from '../../authorization';
import { ClientPartials } from '../../types';
import { CSRF, JWT } from '../../utils';
import { ClientModel } from '../models';

export function getAuthorizationFlow<
  CT extends ClientPartials.Type = string,
  CP extends ClientPartials.Permissions = null,
  CM extends ClientPartials.Meta = null
>(
  clientModel: ClientModel<CT, CP, CM>,
  jwt: JWT<BaseAccessTokenPayload>,
  csrf: CSRF
): AuthorizationFlow<CT, CP, CM, BaseAccessTokenPayload> {
  return createAuthorizationFlow({
    getClientById: (id) => clientModel.getById(id),

    generateCsrfToken: () => csrf.getToken(),

    createAccessTokenPayload: (client, csrfToken) => ({
      csrfToken,
      id: client.id,
    }),

    signAccessToken: (payload) => jwt.getToken(payload, { expiresIn: '1w' }),

    verifyAccessToken: (token) => jwt.decodeToken(token),

    updateCsrfToken: (clientId, token) =>
      clientModel.updateCsrf(clientId, token),
  });
}
