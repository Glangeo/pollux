import { CoreTypes } from 'src/core';
import { RecordSchema } from '../../types';
import { Collection } from './Collection';

export namespace CollectionPartials {
  export type Entity<C extends Collection<any, RecordSchema<any>, any>> =
    ReturnType<C['createEntityFromDBRecord']>;

  export type Record<C extends Collection<any, RecordSchema<any>, any>> =
    Parameters<C['createEntityFromDBRecord']>[0];

  export type DefaultValues<C extends Collection<any, RecordSchema<any>, any>> =
    CoreTypes.Utils.AsyncFuncReturnType<C['getRecordDefaultFields']>;
}
