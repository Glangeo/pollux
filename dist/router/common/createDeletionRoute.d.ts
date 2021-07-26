import { ICollection, IEntitySchema, IRecordSchema } from 'src/db/mongo';
import { IRoute } from 'src/router';
import { Middleware } from 'src/types/Middleware';
import { CollectionEntityType } from 'src/db/mongo/collection/types';
declare const schema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}>>;
export declare function createDeletionRoute<C extends ICollection<IEntitySchema, IRecordSchema<CollectionEntityType<C>>, Partial<IRecordSchema<any>>>>(collection: C, middleware?: Middleware[]): IRoute<typeof schema, boolean, {
    isSucceeded: boolean;
}>;
export {};
