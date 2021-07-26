import { Cursor } from 'mongodb';
import { ICollection } from '../collection/ICollection';
import { IEntitySchema, IRecordSchema } from '../types';
export interface IQueryManyOptions<U extends IRecordSchema<any>> {
    limit?: number;
    skip?: number;
    sort?: Parameters<Cursor<U>['sort']>[0];
}
export interface IDAOOptions<T extends IEntitySchema, U extends IRecordSchema<T>, F extends Partial<U>> {
    modelFactoryFunction?: ICollection<T, U, F>['createEntityFromDBRecord'];
}
