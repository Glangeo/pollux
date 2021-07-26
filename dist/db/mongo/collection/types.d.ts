import { AsyncFuncReturnType } from 'src/types/AsyncFuncReturnType';
import { IEntitySchema, IRecordSchema } from '../types';
import { ICollection } from './ICollection';
export declare type CollectionEntityType<C extends ICollection<IEntitySchema, IRecordSchema<IEntitySchema>, any>> = ReturnType<C['createEntityFromDBRecord']>;
export declare type CollectionRecordType<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, any>> = Parameters<C['createEntityFromDBRecord']>[0];
export declare type CollectionDefaultValuesType<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, any>> = AsyncFuncReturnType<C['getRecordDefaultFields']>;
