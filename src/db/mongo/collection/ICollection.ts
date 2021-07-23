import { IEntitySchema, IRecordSchema } from '../types';

export interface ICollection<
  T extends IEntitySchema,
  U extends IRecordSchema<T>,
  F extends Partial<U>
> {
  readonly name: string;

  createEntityFromDBRecord(record: U): T;

  getRecordDefaultFields(): Promise<F>;
}
