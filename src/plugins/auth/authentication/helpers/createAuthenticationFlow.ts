import { CredentialsPartials, ClientPartials } from '../../types';
import {
  AuthenticationFlow,
  AuthenticationFlowConfig,
  BaseRefreshTokenPayload,
} from '../types';

export function createAuthenticationFlow<
  CredentialsMeta extends CredentialsPartials.Meta,
  ClientType extends ClientPartials.Type,
  ClientPermissions extends ClientPartials.Permissions,
  ClientMeta extends ClientPartials.Meta,
  GetClientExtraArgs extends any[],
  RefreshTokenPayload extends BaseRefreshTokenPayload
>(
  config: AuthenticationFlowConfig<
    CredentialsMeta,
    ClientType,
    ClientPermissions,
    ClientMeta,
    GetClientExtraArgs,
    RefreshTokenPayload
  >
): AuthenticationFlow<
  CredentialsMeta,
  ClientType,
  ClientPermissions,
  ClientMeta,
  GetClientExtraArgs,
  RefreshTokenPayload
> {
  return {
    authenticate: async (login, passowrd, ...args) => {
      const credentials = await config.authenticate(login, passowrd);
      const client = await config.createClient(credentials, ...args);

      const payload = config.createRefreshTokenPayload(client);
      const token = config.signRefreshToken(payload);

      return {
        refreshToken: token,
        client,
        credentials,
      };
    },

    getClient: async (token) => {
      const payload = config.verifyRefreshToken(token);
      const client = await config.getClientById(payload.id);

      return {
        client,
        payload,
      };
    },
  };
}
