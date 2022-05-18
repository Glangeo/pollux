import { Client, ClientPartials, Credentials, CredentialsPartials } from '../../types';
import { BaseRefreshTokenPayload } from './BaseRefreshTokenPayload';
export declare type AuthenticationFlow<CredentialsMeta extends CredentialsPartials.Meta, ClientType extends ClientPartials.Type, ClientPermissions extends ClientPartials.Permissions, ClientMeta extends ClientPartials.Meta, GetClientExtraArgs extends any[], RefreshTokenPayload extends BaseRefreshTokenPayload> = {
    authenticate: (login: string, password: string, ...args: GetClientExtraArgs) => Promise<{
        refreshToken: string;
        credentials: Credentials<CredentialsMeta>;
        client: Client<ClientType, ClientPermissions, ClientMeta>;
    }>;
    getClient(token: string): Promise<{
        client: Client<ClientType, ClientPermissions, ClientMeta>;
        payload: RefreshTokenPayload;
    }>;
};
