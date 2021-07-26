import { Db } from 'mongodb';
import { EntityId, IEntitySchema } from 'src/db/mongo';
interface IPublicID extends IEntitySchema {
    key: string;
    value: number;
}
declare const collection: import("../db/mongo").ICollection<IPublicID, IPublicID, {
    id: -1;
    value: number;
}>;
export declare function generateEntityId(db: Db, collectionName: string): Promise<EntityId>;
export { collection as __EntityIdsCollection };
