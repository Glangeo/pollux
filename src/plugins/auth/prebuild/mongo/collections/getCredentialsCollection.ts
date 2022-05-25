import { WithId } from 'mongodb';
import {
  createCollection,
  generateEntityId,
  MongoDB,
  RecordSchema,
} from 'src/db/drivers/mongo';
import { Credentials, CredentialsPartials } from 'src/plugins/auth/types';

export const DEFAULT_CREDENTIALS_COLLECTION_NAME = 'AuthPlugin_Credentials';

export type CredentialsRecord<M extends CredentialsPartials.Meta = null> =
  RecordSchema<Credentials<M>>;

export function getCredentialsCollection<
  M extends CredentialsPartials.Meta = null
>(db: MongoDB, name = DEFAULT_CREDENTIALS_COLLECTION_NAME) {
  return createCollection({
    name,

    createEntityFromDBRecord(
      record: CredentialsRecord<M>
    ): WithId<Credentials<M>> {
      return record;
    },

    async getRecordDefaultFields() {
      return {
        id: await generateEntityId(db.getDb(), this.name),
        csrfToken: null as string | null,
        createdAt: Date.now(),
      };
    },
  });
}
