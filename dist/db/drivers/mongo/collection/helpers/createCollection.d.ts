import { EntitySchema, RecordSchema } from '../../types';
import { Collection } from '../types/Collection';
/**
 * Helper for easy creation collection
 *
 * @param collection collection properties
 * @returns
 */
export declare function createCollection<T extends EntitySchema, U extends RecordSchema<T>, F extends Partial<U>>(collection: Collection<T, U, F>): Collection<T, U, F>;
