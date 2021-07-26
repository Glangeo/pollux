import { ICollection, IRecordSchema } from 'src/db/mongo';
import { CollectionEntityType } from 'src/db/mongo/collection/types';
import { Middleware } from 'src/types/Middleware';
import { IEntitySchema } from '@interfaces/IEntitySchema';
import { CreateSchemaType } from './common/createCreationRoute';
import { EditSchemaType } from './common/createEditionRoute';
import { IRoute } from './IRoute';
export declare function getDefaultRoutes<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, Partial<IRecordSchema<any>>>>(collection: C, exclude?: {
    create?: boolean;
    get?: boolean;
    edit?: boolean;
    delete?: boolean;
}, schemas?: {
    create?: CreateSchemaType<C>;
    edit?: EditSchemaType<C>;
}, middleware?: Middleware[]): IRoute<any, any, any>[];
