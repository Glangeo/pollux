import { WithId } from 'mongodb';
import {
  createCollection,
  generateEntityId,
  MongoDB,
  RecordSchema,
} from 'src/db/drivers/mongo';
import { Client, ClientPartials } from 'src/plugins/auth/types';

export const DEFAULT_CLIENT_COLLECTION_NAME = 'AuthPlugin_Clients';

export type ClientRecord<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> = RecordSchema<Client<T, P, M>>;

export function getClientCollection<
  T extends ClientPartials.Type = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
>(
  db: MongoDB,
  name = DEFAULT_CLIENT_COLLECTION_NAME,
  getPermissions: () => P = () => null as P,
  getMeta: () => M = () => null as M
) {
  return createCollection({
    name,

    createEntityFromDBRecord(
      record: ClientRecord<T, P, M>
    ): WithId<Client<T, P, M>> {
      return record;
    },

    async getRecordDefaultFields() {
      return {
        id: await generateEntityId(db.getDb(), this.name),
        isBlocked: false,
        refreshedAt: Date.now(),
        createdAt: Date.now(),
        csrfToken: null as string | null,
        permissions: getPermissions(),
        meta: getMeta(),
      };
    },
  });
}
