import { Collection } from '../../collection';
import { EntitySchema, RecordSchema } from '../../types';
export declare type DAOOptions<T extends EntitySchema, U extends RecordSchema<T>, F extends Partial<U>> = {
    modelFactoryFunction?: Collection<T, U, F>['createEntityFromDBRecord'];
};
