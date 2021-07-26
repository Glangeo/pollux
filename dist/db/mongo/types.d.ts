import { ObjectId } from 'mongodb';
export declare type EntityId = number;
export interface IEntitySchema {
    id: EntityId;
}
export declare type IRecordSchema<T extends IEntitySchema> = T;
export declare type IID = ObjectId;
