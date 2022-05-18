import { Client, ClientPartials } from '../../types';
import { BaseAccessTokenPayload } from './BaseAccessTokenPayload';
export declare type AuthorizationFlow<ClientType extends ClientPartials.Type, ClientPermissions extends ClientPartials.Permissions, ClientMeta extends ClientPartials.Meta, AccessTokenPayload extends BaseAccessTokenPayload> = {
    authorize: (token: string) => Promise<{
        client: Client<ClientType, ClientPermissions, ClientMeta>;
        payload: AccessTokenPayload;
    }>;
    getAccessToken: (client: Client<ClientType, ClientPermissions, ClientMeta>) => Promise<string>;
};
