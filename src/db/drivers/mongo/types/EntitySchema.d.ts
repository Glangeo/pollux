import { WithId } from 'mongodb';
import { EntityId } from './EntityId';

export type EntitySchema = WithId<{
  id: EntityId;
}>;
