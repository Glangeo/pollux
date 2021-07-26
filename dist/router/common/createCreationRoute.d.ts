import { ICollection, IRecordSchema } from 'src/db/mongo';
import { CollectionDefaultValuesType, CollectionEntityType } from 'src/db/mongo/collection/types';
import { Middleware } from 'src/types/Middleware';
import { IEntitySchema } from '@interfaces/IEntitySchema';
import { OptionalId } from '@interfaces/node_modules/@types/mongodb';
import { WithoutInternalId } from '@utils/stripInternalId';
import * as Yup from 'yup';
import { IRoute } from '../IRoute';
export declare type CreateSchemaType<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, Partial<IRecordSchema<any>>>> = Yup.ObjectSchema<{
    [key in keyof Omit<OptionalId<CollectionEntityType<C>>, keyof CollectionDefaultValuesType<C>> & Partial<CollectionDefaultValuesType<C>>]: Yup.AnySchema;
}, Record<string, unknown>>;
export declare function createCreationRoute<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, Partial<IRecordSchema<any>>>>(collection: C, schema: CreateSchemaType<C>, middleware?: Middleware[]): IRoute<CreateSchemaType<C>, CollectionEntityType<C>, {
    entity: WithoutInternalId<CollectionEntityType<C>>;
}>;
