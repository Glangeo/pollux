import { ClientSession, Db } from 'mongodb';
import { Collection, CollectionPartials } from '../../collection/types';
import { CollectionAdapter } from '../CollectionAdapter';
import { CollectionAdapterOptions } from '../types';

export function getCollectionAdapter<C extends Collection<any, any, any>>(
  db: Db,
  collection: C,
  options?: CollectionAdapterOptions<
    CollectionPartials.Entity<C>,
    CollectionPartials.Record<C>,
    CollectionPartials.DefaultValues<C>
  >,
  session?: ClientSession
): CollectionAdapter<
  CollectionPartials.Entity<C>,
  CollectionPartials.Record<C>,
  CollectionPartials.DefaultValues<C>
> {
  const adapter = new CollectionAdapter(db, collection, options, session);

  return adapter as any;
}
