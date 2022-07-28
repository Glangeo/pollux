import { Db, WithId, Collection, Filter, FindOptions, UpdateFilter, UpdateOptions, IndexSpecification, CreateIndexesOptions, ClientSession, InsertOneOptions, BulkWriteOptions, CountDocumentsOptions, DeleteOptions } from 'mongodb';
import { Collection as PolluxCollection } from '../collection/types/Collection';
import { RecordSchema } from '../types';
import { CollectionAdapterOptions } from './types';
export declare class CollectionAdapter<T, R extends RecordSchema<T>, F extends Partial<R>> {
    private readonly db;
    private readonly collection;
    private readonly options;
    private readonly session?;
    constructor(db: Db, collection: PolluxCollection<T, R, F>, options?: CollectionAdapterOptions<T, R, F>, session?: ClientSession | undefined);
    withSession(session: ClientSession): CollectionAdapter<T, R, F>;
    create(form: Omit<R, keyof F | '_id'> & Partial<F>, options?: InsertOneOptions): Promise<T>;
    createMany(form: (Omit<R, keyof F | '_id'> & Partial<F>)[], options?: BulkWriteOptions): Promise<T[]>;
    getOne(query: Filter<R>, options?: FindOptions<R>): Promise<T>;
    getMany(query: Filter<R>, options?: FindOptions<R>): Promise<T[]>;
    getAll(options?: FindOptions<R>): Promise<T[]>;
    getDBRecordField<K extends keyof WithId<R>>(query: Filter<R>, fieldName: K, options?: FindOptions<R>): Promise<WithId<R>[K]>;
    getRecordsCount(query: Filter<R>, options?: CountDocumentsOptions): Promise<number>;
    updateOne(query: Filter<R>, updates: UpdateFilter<R> | Partial<R>, options?: UpdateOptions): Promise<boolean>;
    updateMany(query: Filter<R>, updates: UpdateFilter<R> | Partial<R>, options?: UpdateOptions): Promise<boolean>;
    deleteOne(query: Filter<R>, options?: DeleteOptions): Promise<boolean>;
    deleteMany(query: Filter<R>, options: DeleteOptions): Promise<boolean>;
    aggregate(pipeline: Parameters<Collection<R>['aggregate']>[0], options: Parameters<Collection<R>['aggregate']>[1]): Promise<T[]>;
    createIndex(fieldOrSpec: IndexSpecification, options?: CreateIndexesOptions): Promise<void>;
    private getDBCollection;
    private createEntityFromDBRecord;
}
