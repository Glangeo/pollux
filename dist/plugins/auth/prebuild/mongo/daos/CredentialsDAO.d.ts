import { WithId } from 'mongodb';
import { CollectionAdapter, CollectionPartials } from '../../../../../db/drivers/mongo';
import { Credentials, CredentialsPartials } from '../../../types';
import { ICredentialsDAO } from '../../interfaces';
import { CredentialsRecord, getCredentialsCollection } from '../collections';
export declare class CredentialsDAO<M extends CredentialsPartials.Meta = null> implements ICredentialsDAO<M> {
    protected readonly adapter: CollectionAdapter<WithId<Credentials<M>>, CredentialsRecord<M>, CollectionPartials.DefaultValues<ReturnType<typeof getCredentialsCollection>>>;
    constructor(adapter: CollectionAdapter<WithId<Credentials<M>>, CredentialsRecord<M>, CollectionPartials.DefaultValues<ReturnType<typeof getCredentialsCollection>>>);
    create(login: string, hashedPassword: string, salt: string, meta: M): Promise<Credentials<M>>;
    getByLogin(login: string): Promise<Credentials<M>>;
    getById(id: number): Promise<Credentials<M>>;
    updateCsrf(id: number, csrfToken: string): Promise<boolean>;
}
