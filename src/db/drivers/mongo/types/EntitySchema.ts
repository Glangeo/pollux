import { WithId } from 'mongodb';

export type EntitySchema<T> = WithId<T>;
