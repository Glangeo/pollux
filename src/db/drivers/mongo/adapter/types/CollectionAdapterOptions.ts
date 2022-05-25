import { Collection } from '../../collection';
import { RecordSchema } from '../../types';

export type CollectionAdapterOptions<
  T,
  U extends RecordSchema<T>,
  F extends Partial<U>
> = {
  entityFactoryFunction?: Collection<T, U, F>['createEntityFromDBRecord'];
};
