import { Collection, Db, FilterQuery, FindOneOptions, IndexOptions, UpdateOneOptions, UpdateQuery } from 'mongodb';
import { ICollection } from '../collection/ICollection';
import { IEntitySchema, IRecordSchema } from '../types';
import { IDAOOptions } from './types';
export declare class DAO<T extends IEntitySchema, U extends IRecordSchema<T>, F extends Partial<U>> {
    private readonly db;
    private readonly collection;
    private readonly options;
    constructor(db: Db, collection: ICollection<T, U, F>, options?: IDAOOptions<T, U, F>);
    create(form: Omit<U, keyof F> & Partial<F>): Promise<T>;
    createMany(form: (Omit<U, keyof F> & Partial<F>)[]): Promise<T[]>;
    getOne(query: FilterQuery<U>): Promise<T>;
    getMany(query: FilterQuery<U>, options?: FindOneOptions<U>): Promise<T[]>;
    getAll(): Promise<T[]>;
    updateOne(query: FilterQuery<U>, updates: UpdateQuery<U> | Partial<U>, options?: UpdateOneOptions): Promise<boolean>;
    getDBRecordField<K extends keyof U>(query: FilterQuery<U>, fieldName: K): Promise<U[K]>;
    getRecordsCount(query: FilterQuery<U>): Promise<number>;
    deleteOne(query: FilterQuery<U>): Promise<boolean>;
    deleteMany(query: FilterQuery<U>): Promise<boolean>;
    aggregate(pipeline: Parameters<Collection<U>['aggregate']>[0], options: Parameters<Collection<U>['aggregate']>[1]): Promise<T[]>;
    createIndex(fieldOrSpec: any, options?: IndexOptions): Promise<void>;
    private getDBCollection;
    private createEntityFromDBRecord;
}
