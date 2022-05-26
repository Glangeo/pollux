import { RecordSchema } from '../../types';
import { Collection } from '../types/Collection';

/**
 * Helper for easy creation collection
 *
 * @param collection collection properties
 * @returns
 */
export function createCollection<
  T,
  U extends RecordSchema<any>,
  F extends Partial<U>
>(collection: Collection<T, U, F>): Collection<T, U, F> {
  return collection;
}
