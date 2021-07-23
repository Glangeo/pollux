import { Db } from 'mongodb';
import { ICollection } from '../collection/ICollection';
import {
  CollectionDefaultValuesType,
  CollectionEntityType,
  CollectionRecordType,
} from '../collection/types';
import { IEntitySchema, IRecordSchema } from '../types';
import { DAO } from './DAO';

export function getDAO<
  C extends ICollection<
    IEntitySchema,
    IRecordSchema<CollectionEntityType<C>>,
    Partial<IRecordSchema<any>>
  >
>(
  db: Db,
  collection: C
): DAO<
  CollectionEntityType<C>,
  CollectionRecordType<C>,
  CollectionDefaultValuesType<C>
> {
  const dao = new DAO(db, collection);

  return dao as any;
}
