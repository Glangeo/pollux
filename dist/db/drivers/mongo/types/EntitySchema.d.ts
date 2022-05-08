import { WithId } from 'mongodb';
import { EntityId } from './EntityId';
export declare type EntitySchema = WithId<{
    id: EntityId;
}>;
