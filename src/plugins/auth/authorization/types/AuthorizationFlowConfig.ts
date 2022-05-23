import { Client, ClientPartials } from '../../types';
import { BaseAccessTokenPayload } from './BaseAccessTokenPayload';

export type AuthorizationFlowConfig<
  ClientType extends ClientPartials.Type,
  ClientPermissions extends ClientPartials.Permissions,
  ClientMeta extends ClientPartials.Meta,
  AccessTokenPayload extends BaseAccessTokenPayload
> = {
  getClientById: (
    id: number
  ) => Promise<Client<ClientType, ClientPermissions, ClientMeta>>;

  createAccessTokenPayload: (
    client: Client<ClientType, ClientPermissions, ClientMeta>,
    csrfToken: string
  ) => AccessTokenPayload;

  generateCsrfToken(): string;

  signAccessToken: (payload: AccessTokenPayload) => string;

  verifyAccessToken: (token: string) => AccessTokenPayload;

  updateCsrfToken: (clientId: number, token: string) => Promise<boolean>;
};
