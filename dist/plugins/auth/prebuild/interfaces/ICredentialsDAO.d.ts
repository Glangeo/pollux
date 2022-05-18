import { EntityId } from '../../../../db/drivers/mongo';
import { CredentialsPartials, Credentials } from '../../types';
export interface ICredentialsDAO<M extends CredentialsPartials.Meta = null> {
    create(login: string, hashedPassword: string, salt: string, meta: M): Promise<Credentials<M>>;
    getByLogin(login: string): Promise<Credentials<M>>;
    getById(id: EntityId): Promise<Credentials<M>>;
}
