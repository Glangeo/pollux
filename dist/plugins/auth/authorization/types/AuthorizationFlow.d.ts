import { Client, ClientPartials } from '../../types';
export declare type AuthorizationFlow<ClientType extends ClientPartials.Type, ClientPermissions extends ClientPartials.Permissions, ClientMeta extends ClientPartials.Meta> = {
    authorize: (token: string) => Promise<Client<ClientType, ClientPermissions, ClientMeta>>;
    getAccessToken: (client: Client<ClientType, ClientPermissions, ClientMeta>) => Promise<string>;
};
