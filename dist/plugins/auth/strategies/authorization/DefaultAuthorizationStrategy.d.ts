import { CSRF, JWT } from '../../helpers';
import { IAuthorizationStrategy } from '../../interfaces/IAuthorizationStrategy';
import { ClientModel } from '../../models/ClientModel';
import { Client, ClientPartials } from '../../types';
export declare type AccessTokenPayload = {
    readonly id: number;
    readonly csrfToken: string;
};
export declare class DefaultAuthorizationStrategy<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> implements IAuthorizationStrategy<T, P, M> {
    protected readonly jwt: JWT<AccessTokenPayload>;
    protected readonly csrf: CSRF;
    constructor(jwt: JWT<AccessTokenPayload>, csrf: CSRF);
    getAccessToken(model: ClientModel<T, P, M>, client: Client<T, P, M>): Promise<string>;
    getClientByAccessToken(model: ClientModel<T, P, M>, token: string): Promise<Client<T, P, M>>;
}
