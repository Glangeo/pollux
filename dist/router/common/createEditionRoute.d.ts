import { ICollection, IRecordSchema } from 'src/db/mongo';
import { CollectionEntityType } from 'src/db/mongo/collection/types';
import { Middleware } from 'src/types/Middleware';
import { IEntitySchema } from '@interfaces/IEntitySchema';
import * as Yup from 'yup';
import { IRoute } from '../IRoute';
export declare type EditSchemaType<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, Partial<IRecordSchema<any>>>> = Yup.ObjectSchema<{
    [key in keyof Partial<CollectionEntityType<C>>]: Yup.AnySchema;
}, Record<string, unknown>>;
export declare function createEditionRoute<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, Partial<IRecordSchema<any>>>>(collection: C, schema: EditSchemaType<C>, middleware?: Middleware[]): IRoute<EditSchemaType<C & {
    id: Yup.NumberSchema;
}>, boolean, {
    isSucceeded: boolean;
}>;
