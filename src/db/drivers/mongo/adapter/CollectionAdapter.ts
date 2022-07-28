import {
  Db,
  WithId,
  Collection,
  Filter,
  FindOptions,
  UpdateFilter,
  UpdateOptions,
  IndexSpecification,
  CreateIndexesOptions,
  ClientSession,
  InsertOneOptions,
  BulkWriteOptions,
  CountDocumentsOptions,
  DeleteOptions,
} from 'mongodb';
import {
  InternalException,
  NotFoundException,
} from 'src/core/exception/prebuild';
import { stringifyObject } from 'src/local-utils';
import { Collection as PolluxCollection } from '../collection/types/Collection';
import { RecordSchema } from '../types';
import { CollectionAdapterOptions } from './types';

export class CollectionAdapter<
  T,
  R extends RecordSchema<T>,
  F extends Partial<R>
> {
  public constructor(
    private readonly db: Db,
    private readonly collection: PolluxCollection<T, R, F>,
    private readonly options: CollectionAdapterOptions<T, R, F> = {},
    private readonly session?: ClientSession
  ) {}

  public withSession(session: ClientSession): CollectionAdapter<T, R, F> {
    return new CollectionAdapter(
      this.db,
      this.collection,
      this.options,
      session
    );
  }

  public async create(
    form: Omit<R, keyof F | '_id'> & Partial<F>,
    options: InsertOneOptions = {}
  ): Promise<T> {
    const dbCollection = this.getDBCollection();
    const defaultValues = await this.collection.getRecordDefaultFields();

    const data = {
      ...defaultValues,
      ...form,
    };

    const operation = await dbCollection.insertOne(
      // TODO: fix this type somehow
      data as any,
      {
        session: this.session,
        ...options,
      }
    );

    if (operation.acknowledged) {
      return this.getOne({ _id: operation.insertedId as any });
    }

    throw new InternalException({
      message: 'Could not create entity.',
      meta: {
        description: [
          `Collection name: ${this.collection.name}`,
          `Data: ${stringifyObject(data)}`,
        ],
      },
    });
  }

  public async createMany(
    form: (Omit<R, keyof F | '_id'> & Partial<F>)[],
    options?: BulkWriteOptions
  ): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const processedData = [];

    for (const inputData of form) {
      const defaultValues = await this.collection.getRecordDefaultFields();

      processedData.push({
        ...defaultValues,
        ...inputData,
      });
    }

    const operation = await dbCollection.insertMany(processedData as any, {
      session: this.session,
      ...options,
    });

    if (operation.acknowledged) {
      const ids = Object.keys(operation.insertedIds).reduce(
        (ids, index) => [...ids, operation.insertedIds[Number(index)]],
        [] as any[]
      );
      return this.getMany({ _id: { $in: ids } });
    }

    throw new InternalException({
      message: 'Could not create entity.',
      meta: {
        description: [
          `Collection name: ${this.collection.name}`,
          `Data: ${stringifyObject(processedData)}`,
        ],
      },
    });
  }

  public async getOne(query: Filter<R>, options?: FindOptions<R>): Promise<T> {
    const dbCollection = this.getDBCollection();
    const document = await dbCollection.findOne(query, {
      session: this.session,
      ...options,
    });

    if (document) {
      return this.createEntityFromDBRecord(document);
    }

    throw new NotFoundException({
      message: 'Entity is not found.',
      meta: {
        collection: this.collection.name,
        query: stringifyObject(query),
      },
    });
  }

  public async getMany(
    query: Filter<R>,
    options?: FindOptions<R>
  ): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const dbQuery = dbCollection.find(query, {
      session: this.session,
      ...options,
    });

    const documents = await dbQuery.toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document)
      );
    }

    return [];
  }

  public async getAll(options?: FindOptions<R>): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const dbQuery = dbCollection.find(
      {},
      {
        session: this.session,
        ...options,
      }
    );

    const documents = await dbQuery.toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document)
      );
    }

    return [];
  }

  public async getDBRecordField<K extends keyof WithId<R>>(
    query: Filter<R>,
    fieldName: K,
    options?: FindOptions<R>
  ): Promise<WithId<R>[K]> {
    const dbCollection = this.getDBCollection();
    const document = await dbCollection.findOne(query, {
      session: this.session,
      ...options,
    });

    if (document) {
      return document[fieldName];
    }

    throw new NotFoundException({
      message: 'Entity is not found.',
      meta: {
        collection: this.collection.name,
        query: stringifyObject(query),
      },
    });
  }

  public async getRecordsCount(
    query: Filter<R>,
    options?: CountDocumentsOptions
  ): Promise<number> {
    const dbCollection = this.getDBCollection();
    const count = await dbCollection.countDocuments(query, {
      session: this.session,
      ...options,
    });

    return count;
  }

  public async updateOne(
    query: Filter<R>,
    updates: UpdateFilter<R> | Partial<R>,
    options?: UpdateOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();

    const operation = await dbCollection.updateOne(query, updates, {
      session: this.session,
      ...options,
    });

    return Boolean(operation.acknowledged && operation.matchedCount);
  }

  public async updateMany(
    query: Filter<R>,
    updates: UpdateFilter<R> | Partial<R>,
    options?: UpdateOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();

    const operation = await dbCollection.updateMany(query, updates, {
      session: this.session,
      ...options,
    });

    return Boolean(operation.acknowledged && operation.matchedCount);
  }

  public async deleteOne(
    query: Filter<R>,
    options?: DeleteOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();
    const operation = await dbCollection.deleteOne(query, {
      session: this.session,
      ...options,
    });

    return Boolean(operation.acknowledged && operation.deletedCount);
  }

  public async deleteMany(
    query: Filter<R>,
    options: DeleteOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();
    const operation = await dbCollection.deleteMany(query, {
      session: this.session,
      ...options,
    });

    return Boolean(operation.acknowledged && operation.deletedCount);
  }

  public async aggregate(
    pipeline: Parameters<Collection<R>['aggregate']>[0],
    options: Parameters<Collection<R>['aggregate']>[1]
  ): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const documents = await dbCollection
      .aggregate(pipeline, {
        session: this.session,
        ...options,
      })
      .toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document as WithId<R>)
      );
    }

    return [];
  }

  public async createIndex(
    fieldOrSpec: IndexSpecification,
    options?: CreateIndexesOptions
  ): Promise<void> {
    await this.getDBCollection().createIndex(fieldOrSpec, {
      session: this.session,
      ...options,
    });
  }

  private getDBCollection(): Collection<R> {
    return this.db.collection(this.collection.name);
  }

  private createEntityFromDBRecord(record: WithId<R>): T {
    if (this.options.entityFactoryFunction) {
      return this.options.entityFactoryFunction(record as R);
    }

    return this.collection.createEntityFromDBRecord(record as R);
  }
}
