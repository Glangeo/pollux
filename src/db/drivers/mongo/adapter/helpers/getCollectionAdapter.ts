import { Db } from 'mongodb';
import { Collection, CollectionPartials } from '../../collection/types';
import { CollectionAdapter } from '../CollectionAdapter';

export function getCollectionAdapter<C extends Collection<any, any, any>>(
  db: Db,
  collection: C
): CollectionAdapter<
  CollectionPartials.Entity<C>,
  CollectionPartials.Record<C>,
  CollectionPartials.DefaultValues<C>
> {
  const adapter = new CollectionAdapter(db, collection);

  return adapter as any;
}
