import { WithId } from 'mongodb';
import { MongoDB, RecordSchema } from '../../../../../db/drivers/mongo';
import { Credentials, CredentialsPartials } from '../../../types';
export declare const DEFAULT_CREDENTIALS_COLLECTION_NAME = "AuthPlugin_Credentials";
export declare type CredentialsRecord<M extends CredentialsPartials.Meta = null> = RecordSchema<WithId<Credentials<M>>>;
export declare function getCredentialsCollection<M extends CredentialsPartials.Meta = null>(db: MongoDB, name?: string): import("../../../../../db/drivers/mongo").Collection<WithId<Credentials<M>>, WithId<WithId<Credentials<M>>>, {
    id: number;
    csrfToken: string | null;
    createdAt: number;
}>;
