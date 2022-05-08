import { EntitySchema, RecordSchema } from '../../types';
export declare type Collection<T extends EntitySchema, U extends RecordSchema<T>, F extends Partial<U>> = {
    readonly name: string;
    createEntityFromDBRecord(record: U): T;
    getRecordDefaultFields(): Promise<F>;
};
