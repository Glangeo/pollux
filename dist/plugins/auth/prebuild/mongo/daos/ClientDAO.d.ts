import { WithId } from 'mongodb';
import { CollectionAdapter, CollectionPartials } from '../../../../../db/drivers/mongo';
import { Client, ClientPartials } from '../../../types';
import { IClientDAO } from '../../interfaces';
import { ClientRecord } from '../collections';
/**
 * After doing some research, I found out that there is not other way
 * to extract type from generic function with passing generic types to it
 * */
declare class WrapperForTypeExtract<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> {
    wrapped(args: any[]): import("../../../../../db/drivers/mongo").Collection<WithId<Client<T, P, M>>, WithId<WithId<Client<T, P, M>>>, {
        id: number;
        isBlocked: boolean;
        refreshedAt: number;
        createdAt: number;
        permissions: P;
        meta: M;
    }>;
}
export declare class ClientDAO<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> implements IClientDAO<T, P, M> {
    protected readonly adapter: CollectionAdapter<WithId<Client<T, P, M>>, ClientRecord<T, P, M>, CollectionPartials.DefaultValues<ReturnType<WrapperForTypeExtract<T, P, M>['wrapped']>>>;
    constructor(adapter: CollectionAdapter<WithId<Client<T, P, M>>, ClientRecord<T, P, M>, CollectionPartials.DefaultValues<ReturnType<WrapperForTypeExtract<T, P, M>['wrapped']>>>);
    create(type: T, credentialsId: number, permissions: P, meta: M): Promise<Client<T, P, M>>;
    getById(id: number): Promise<Client<T, P, M>>;
    updateCsrf(id: number, csrfToken: string, date: number): Promise<boolean>;
    block(id: number): Promise<boolean>;
}
export {};
