import { Db } from 'mongodb';
import { Collection, CollectionPartials } from '../../collection/types';
import { EntitySchema, RecordSchema } from '../../types';
import { DAO } from '../DAO';

export function getDAO<
  T extends EntitySchema,
  R extends RecordSchema<T>,
  C extends Collection<T, R, Partial<RecordSchema<any>>>
>(db: Db, collection: C): DAO<T, R, CollectionPartials.DefaultValues<C>> {
  const dao = new DAO(db, collection);

  return dao as any;
}
