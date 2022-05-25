import { WithId } from 'mongodb';
import { MongoDB, RecordSchema } from '../../../../../db/drivers/mongo';
import { Client, ClientPartials } from '../../../types';
export declare const DEFAULT_CLIENT_COLLECTION_NAME = "AuthPlugin_Clients";
export declare type ClientRecord<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> = RecordSchema<Client<T, P, M>>;
export declare function getClientCollection<T extends ClientPartials.Type = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null>(db: MongoDB, name?: string, getPermissions?: () => P, getMeta?: () => M): import("../../../../../db/drivers/mongo").Collection<WithId<Client<T, P, M>>, ClientRecord<T, P, M>, {
    id: number;
    isBlocked: boolean;
    refreshedAt: number;
    createdAt: number;
    csrfToken: string | null;
    permissions: P;
    meta: M;
}>;
