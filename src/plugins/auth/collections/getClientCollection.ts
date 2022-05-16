import { WithId } from 'mongodb';
import {
  createCollection,
  generateEntityId,
  MongoDB,
  RecordSchema,
} from 'src/db/drivers/mongo';
import { Client, ClientPartials } from '../types';

export const DEFAULT_CLIENT_COLLECTION_NAME = 'AuthPlugin_Clients';

export type ClientRecord<
  T extends ClientPartials.Type,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> = RecordSchema<WithId<Client<T, P, M>>>;

export function getClientCollection<
  T extends ClientPartials.Type,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
>(db: MongoDB, name = DEFAULT_CLIENT_COLLECTION_NAME) {
  return createCollection({
    name,

    createEntityFromDBRecord(
      record: WithId<ClientRecord<T, P, M>>
    ): WithId<Client<T, P, M>> {
      return record;
    },

    async getRecordDefaultFields() {
      return {
        id: await generateEntityId(db.getDb(), this.name),
        csrfToken: null as string | null,
        isBlocked: false,
        refreshedAt: Date.now(),
        createdAt: Date.now(),
        permissions: null as P,
        meta: null as M,
      };
    },
  });
}
