import { Client, ClientPartials } from '../../types';
import { IClientDAO } from '../interfaces';
export declare class ClientModel<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> {
    protected readonly dao: IClientDAO<T, P, M>;
    constructor(dao: IClientDAO<T, P, M>);
    create(type: T, credentialsId: number, permissions: P, meta: M): Promise<Client<T, P, M>>;
    getById(id: number): Promise<Client<T, P, M>>;
    updateCsrf(id: number, token: string): Promise<boolean>;
    block(id: number): Promise<boolean>;
}
