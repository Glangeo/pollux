import { RecordSchema } from '../../types';

export type Collection<T, U extends RecordSchema<any>, F extends Partial<U>> = {
  readonly name: string;

  createEntityFromDBRecord(record: U): T;

  getRecordDefaultFields(): Promise<F>;
};
