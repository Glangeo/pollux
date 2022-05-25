import { Db } from 'mongodb';
import { NotFoundException } from 'src/core/exception/prebuild';
import { createCollection } from '..';
import { getCollectionAdapter } from '../adapter/helpers';
import { EntitySchema, RecordSchema } from '../types';

type PublicID = EntitySchema<{
  key: string;
  value: number;
}>;
type PublicIDRecord = RecordSchema<PublicID>;

const collection = createCollection({
  name: 'core__ids',
  createEntityFromDBRecord(record: PublicIDRecord): PublicID {
    return record;
  },
  async getRecordDefaultFields() {
    return {
      id: -1,
      value: 1,
    };
  },
});

export async function generateEntityId(
  db: Db,
  collectionName: string
): Promise<number> {
  const dao = getCollectionAdapter(db, collection);

  let publicId: PublicID | undefined;

  try {
    publicId = await dao.getOne({ key: collectionName });
  } catch (exception) {
    if (exception instanceof NotFoundException) {
      publicId = await dao.create({ key: collectionName });
    } else {
      throw exception;
    }
  }

  const id = publicId.value;

  await dao.updateOne({ key: collectionName }, { $set: { value: id + 1 } });

  return id;
}

export { collection as __EntityIdsCollection };
