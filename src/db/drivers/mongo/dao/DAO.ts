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
} from 'mongodb';
import {
  InternalException,
  NotFoundException,
} from 'src/core/exception/prebuild';
import { stringifyObject } from 'src/local-utils';
import { Collection as PolluxCollection } from '../collection/types/Collection';
import { EntitySchema, RecordSchema } from '../types';
import { DAOOptions } from './types';

export class DAO<
  T extends EntitySchema,
  U extends RecordSchema<T>,
  F extends Partial<U>
> {
  public constructor(
    private readonly db: Db,
    private readonly collection: PolluxCollection<T, U, F>,
    private readonly options: DAOOptions<T, U, F> = {}
  ) {}

  public async create(form: Omit<U, keyof F> & Partial<F>): Promise<T> {
    const dbCollection = this.getDBCollection();
    const defaultValues = await this.collection.getRecordDefaultFields();

    const data = {
      ...defaultValues,
      ...form,
    };

    const operation = await dbCollection.insertOne(
      // TODO: fix this type somehow
      data as any
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
    form: (Omit<U, keyof F> & Partial<F>)[]
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

    const operation = await dbCollection.insertMany(processedData as any);

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

  public async getOne(query: Filter<U>): Promise<T> {
    const dbCollection = this.getDBCollection();
    const document = await dbCollection.findOne(query);

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
    query: Filter<U>,
    options: FindOptions<U> = {}
  ): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const dbQuery = dbCollection.find(query, options as any);

    const documents = await dbQuery.toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document)
      );
    }

    return [];
  }

  public async getAll(): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const dbQuery = dbCollection.find();

    const documents = await dbQuery.toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document)
      );
    }

    return [];
  }

  public async getDBRecordField<K extends keyof WithId<U>>(
    query: Filter<U>,
    fieldName: K
  ): Promise<WithId<U>[K]> {
    const dbCollection = this.getDBCollection();
    const document = await dbCollection.findOne(query);

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

  public async getRecordsCount(query: Filter<U>): Promise<number> {
    const dbCollection = this.getDBCollection();
    const count = await dbCollection.countDocuments(query);

    return count;
  }

  public async updateOne(
    query: Filter<U>,
    updates: UpdateFilter<U> | Partial<U>,
    options?: UpdateOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();

    const operation = await dbCollection.updateOne(
      query,
      updates,
      options || {}
    );

    return Boolean(operation.acknowledged && operation.matchedCount);
  }

  public async updateMany(
    query: Filter<U>,
    updates: UpdateFilter<U> | Partial<U>,
    options?: UpdateOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();

    const operation = await dbCollection.updateMany(
      query,
      updates,
      options || {}
    );

    return Boolean(operation.acknowledged && operation.matchedCount);
  }

  public async deleteOne(query: Filter<U>): Promise<boolean> {
    const dbCollection = this.getDBCollection();
    const operation = await dbCollection.deleteOne(query);

    return Boolean(operation.acknowledged && operation.deletedCount);
  }

  public async deleteMany(query: Filter<U>): Promise<boolean> {
    const dbCollection = this.getDBCollection();
    const operation = await dbCollection.deleteMany(query);

    return Boolean(operation.acknowledged && operation.deletedCount);
  }

  public async aggregate(
    pipeline: Parameters<Collection<U>['aggregate']>[0],
    options: Parameters<Collection<U>['aggregate']>[1]
  ): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const documents = await dbCollection.aggregate(pipeline, options).toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document as WithId<U>)
      );
    }

    return [];
  }

  public async createIndex(
    fieldOrSpec: IndexSpecification,
    options?: CreateIndexesOptions
  ): Promise<void> {
    await this.getDBCollection().createIndex(fieldOrSpec, options || {});
  }

  private getDBCollection(): Collection<U> {
    return this.db.collection(this.collection.name);
  }

  private createEntityFromDBRecord(record: WithId<U>): T {
    if (this.options.modelFactoryFunction) {
      return this.options.modelFactoryFunction(record as U);
    }

    return this.collection.createEntityFromDBRecord(record as U);
  }
}
