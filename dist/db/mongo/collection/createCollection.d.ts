import { IEntitySchema, IRecordSchema } from '../types';
import { ICollection } from './ICollection';
export declare function createCollection<T extends IEntitySchema, U extends IRecordSchema<T>, F extends Partial<U>>(collection: ICollection<T, U, F>): ICollection<T, U, F>;
