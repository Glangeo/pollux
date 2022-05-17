import { Collection } from '../../collection';
import { EntitySchema, RecordSchema } from '../../types';
export declare type CollectionAdapterOptions<T extends EntitySchema, U extends RecordSchema<T>, F extends Partial<U>> = {
    entityFactoryFunction?: Collection<T, U, F>['createEntityFromDBRecord'];
};
