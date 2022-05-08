import { Db } from 'mongodb';
import { EntityId } from '..';
import { EntitySchema } from '../types';
declare type PublicID = EntitySchema & {
    key: string;
    value: number;
};
declare const collection: import("..").Collection<PublicID, PublicID, {
    id: -1;
    value: number;
}>;
export declare function generateEntityId(db: Db, collectionName: string): Promise<EntityId>;
export { collection as __EntityIdsCollection };
