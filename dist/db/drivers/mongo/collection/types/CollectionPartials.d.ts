import { CoreTypes } from '../../../../../core';
import { EntitySchema, RecordSchema } from '../../types';
import { Collection } from './Collection';
export declare namespace CollectionPartials {
    type Entity<C extends Collection<EntitySchema, RecordSchema<EntitySchema>, any>> = ReturnType<C['createEntityFromDBRecord']>;
    type Record<C extends Collection<EntitySchema, RecordSchema<EntitySchema>, any>> = Parameters<C['createEntityFromDBRecord']>[0];
    type DefaultValues<C extends Collection<EntitySchema, RecordSchema<EntitySchema>, any>> = CoreTypes.Utils.AsyncFuncReturnType<C['getRecordDefaultFields']>;
}
