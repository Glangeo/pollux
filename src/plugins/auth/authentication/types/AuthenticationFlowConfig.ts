import {
  CredentialsPartials,
  ClientPartials,
  Credentials,
  Client,
} from '../../types';

export type AuthenticationFlowConfig<
  CredentialsMeta extends CredentialsPartials.Meta,
  ClientType extends ClientPartials.Type,
  ClientPermissions extends ClientPartials.Permissions,
  ClientMeta extends ClientPartials.Meta,
  GetClientExtraArgs extends any[],
  RefreshTokenPayload extends { id: number }
> = {
  authenticate: (
    login: string,
    password: string
  ) => Promise<Credentials<CredentialsMeta>>;

  createClient: (
    credentials: Credentials<CredentialsMeta>,
    ...args: GetClientExtraArgs
  ) => Promise<Client<ClientType, ClientPermissions, ClientMeta>>;

  getClientById(
    id: number
  ): Promise<Client<ClientType, ClientPermissions, ClientMeta>>;

  createRefreshTokenPayload: (
    client: Client<ClientType, ClientPermissions, ClientMeta>
  ) => RefreshTokenPayload;

  signRefreshToken(payload: RefreshTokenPayload): string;

  verifyRefreshToken(token: string): RefreshTokenPayload;
};
