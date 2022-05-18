import { Client, ClientPartials } from '../../types';
export interface IClientDAO<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> {
    create(type: T, credentialsId: number, permissions: P, meta: M): Promise<Client<T, P, M>>;
    getById(id: number): Promise<Client<T, P, M>>;
    updateCsrf(id: number, csrfToken: string, refreshedAt: number): Promise<boolean>;
    block(id: number): Promise<boolean>;
}
