import { ObjectId } from 'mongodb';

export type EntityId = number;

export interface IEntitySchema {
  id: EntityId;
}

export type IRecordSchema<T extends IEntitySchema> = T;

export type IID = ObjectId;
