import { AsyncFuncReturnType } from '../../../types/AsyncFuncReturnType';
import { IEntitySchema, IRecordSchema } from '../types';
import { ICollection } from './ICollection';

export type CollectionEntityType<
  C extends ICollection<IEntitySchema, IRecordSchema<IEntitySchema>, any>
> = ReturnType<C['createEntityFromDBRecord']>;

export type CollectionRecordType<
  C extends ICollection<
    IEntitySchema,
    IRecordSchema<CollectionEntityType<C>>,
    any
  >
> = Parameters<C['createEntityFromDBRecord']>[0];

export type CollectionDefaultValuesType<
  C extends ICollection<
    IEntitySchema,
    IRecordSchema<CollectionEntityType<C>>,
    any
  >
> = AsyncFuncReturnType<C['getRecordDefaultFields']>;
