// eslint-disable-next-line max-classes-per-file
import { WithId } from 'mongodb';
import { CollectionAdapter, CollectionPartials } from 'src/db/drivers/mongo';
import { IClientDAO } from 'src/plugins/auth/interfaces';
import { Client, ClientPartials } from 'src/plugins/auth/types';
import { ClientRecord, getClientCollection } from '../collections';

/**
 * After doing some research, I found out that there is not other way
 * to extract type from generic function with passing generic types to it
 * */
class WrapperForTypeExtract<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> {
  public wrapped(args: any[]) {
    return getClientCollection<T, P, M>(args[0], args[1]);
  }
}

export class ClientDAO<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> implements IClientDAO<T, P, M>
{
  public constructor(
    protected readonly adapter: CollectionAdapter<
      WithId<Client<T, P, M>>,
      ClientRecord<T, P, M>,
      CollectionPartials.DefaultValues<
        ReturnType<WrapperForTypeExtract<T, P, M>['wrapped']>
      >
    >
  ) {}

  public async create(
    type: T,
    credentialsId: number,
    permissions: P,
    meta: M
  ): Promise<Client<T, P, M>> {
    const client = await this.adapter.create({
      type,
      credentialsId,
      permissions,
      meta,
    });

    return client;
  }

  public async getById(id: number): Promise<Client<T, P, M>> {
    return this.adapter.getOne({ id });
  }

  public updateCsrf(
    id: number,
    csrfToken: string,
    date: number
  ): Promise<boolean> {
    return this.adapter.updateOne(
      { id },
      { $set: { csrfToken, refreshedAt: date } }
    );
  }

  public async block(id: number): Promise<boolean> {
    return this.adapter.updateOne({ id }, { $set: { isBlocked: true } });
  }
}
