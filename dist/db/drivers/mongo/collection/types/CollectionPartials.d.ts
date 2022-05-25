import { CoreTypes } from '../../../../../core';
import { RecordSchema } from '../../types';
import { Collection } from './Collection';
export declare namespace CollectionPartials {
    type Entity<C extends Collection<any, RecordSchema<any>, any>> = ReturnType<C['createEntityFromDBRecord']>;
    type Record<C extends Collection<any, RecordSchema<any>, any>> = Parameters<C['createEntityFromDBRecord']>[0];
    type DefaultValues<C extends Collection<any, RecordSchema<any>, any>> = CoreTypes.Utils.AsyncFuncReturnType<C['getRecordDefaultFields']>;
}
