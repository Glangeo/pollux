import { CoreTypes } from 'src/core';
import { EntitySchema, RecordSchema } from '../../types';
import { Collection } from './Collection';

export namespace CollectionPartials {
  export type Entity<
    C extends Collection<EntitySchema, RecordSchema<EntitySchema>, any>
  > = ReturnType<C['createEntityFromDBRecord']>;

  export type Record<
    C extends Collection<EntitySchema, RecordSchema<EntitySchema>, any>
  > = Parameters<C['createEntityFromDBRecord']>[0];

  export type DefaultValues<
    C extends Collection<EntitySchema, RecordSchema<EntitySchema>, any>
  > = CoreTypes.Utils.AsyncFuncReturnType<C['getRecordDefaultFields']>;
}
