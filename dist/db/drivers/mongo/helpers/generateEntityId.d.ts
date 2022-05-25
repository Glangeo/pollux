import { Db } from 'mongodb';
import { EntitySchema, RecordSchema } from '../types';
declare type PublicID = EntitySchema<{
    key: string;
    value: number;
}>;
declare type PublicIDRecord = RecordSchema<PublicID>;
declare const collection: import("..").Collection<PublicID, PublicIDRecord, {
    id: number;
    value: number;
}>;
export declare function generateEntityId(db: Db, collectionName: string): Promise<number>;
export { collection as __EntityIdsCollection };
