import { Db } from 'mongodb';
import {
  createCollection,
  EntityId,
  getDAO,
  IEntitySchema,
  IRecordSchema,
} from 'src/db/mongo';
import { NotFoundException } from 'src/exception/common/NotFountException';

interface IPublicID extends IEntitySchema {
  key: string;
  value: number;
}

const collection = createCollection({
  name: 'core__ids',
  createEntityFromDBRecord(record: IRecordSchema<IPublicID>): IPublicID {
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
): Promise<EntityId> {
  const dao = getDAO(db, collection);

  let publicId: IPublicID | undefined;
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
