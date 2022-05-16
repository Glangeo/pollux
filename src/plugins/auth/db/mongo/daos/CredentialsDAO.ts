import { WithId } from 'mongodb';
import { CollectionAdapter, CollectionPartials } from 'src/db/drivers/mongo';
import { ICredentialsDAO } from 'src/plugins/auth/interfaces';
import { Credentials, CredentialsPartials } from 'src/plugins/auth/types';
import { CredentialsRecord, getCredentialsCollection } from '../collections';

export class CredentialsDAO<M extends CredentialsPartials.Meta = null>
  implements ICredentialsDAO<M>
{
  public constructor(
    protected readonly adapter: CollectionAdapter<
      WithId<Credentials<M>>,
      CredentialsRecord<M>,
      CollectionPartials.DefaultValues<
        ReturnType<typeof getCredentialsCollection>
      >
    >
  ) {}

  public async create(
    login: string,
    hashedPassword: string,
    salt: string,
    meta: M
  ): Promise<Credentials<M>> {
    const credentials = await this.adapter.create({
      login,
      hashedPassword,
      salt,
      meta,
    });

    return credentials;
  }

  public async getByLogin(login: string): Promise<Credentials<M>> {
    return this.adapter.getOne({ login });
  }

  public async getById(id: number): Promise<Credentials<M>> {
    return this.adapter.getOne({ id });
  }

  public async updateCsrf(id: number, csrfToken: string): Promise<boolean> {
    return this.adapter.updateOne({ id }, { $set: { csrfToken } });
  }
}
