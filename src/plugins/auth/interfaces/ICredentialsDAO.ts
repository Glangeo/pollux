import { EntityId } from 'src/db/drivers/mongo';
import { Credentials, CredentialsPartials } from '../types';

export interface ICredentialsDAO<M extends CredentialsPartials.Meta = null> {
  create(
    login: string,
    hashedPassword: string,
    salt: string,
    meta: M
  ): Promise<Credentials<M>>;

  getByLogin(login: string): Promise<Credentials<M>>;

  getById(id: EntityId): Promise<Credentials<M>>;

  updateCsrf(id: EntityId, csrfToken: string): Promise<boolean>;
}
