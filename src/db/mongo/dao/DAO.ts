import {
  Collection,
  Db,
  FilterQuery,
  FindOneOptions,
  IndexOptions,
  UpdateOneOptions,
  UpdateQuery,
  WithId,
} from 'mongodb';
import { NotFoundException } from '../../../exception/common/NotFountException';
import { DBException } from '../../../exception/common/DBException';
import { ICollection } from '../collection/ICollection';
import { IEntitySchema, IRecordSchema } from '../types';
import { IDAOOptions } from './types';

export class DAO<
  T extends IEntitySchema,
  U extends IRecordSchema<T>,
  F extends Partial<U>
> {
  public constructor(
    private readonly db: Db,
    private readonly collection: ICollection<T, U, F>,
    private readonly options: IDAOOptions<T, U, F> = {}
  ) {
    this.createEntityFromDBRecord = this.createEntityFromDBRecord.bind(this);
  }

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

    if (operation.result.ok) {
      return this.createEntityFromDBRecord(operation.ops[0]);
    }

    throw new DBException('DAO -> create(...)', [
      `Collection name: ${this.collection.name}`,
      `Data: ${JSON.stringify(data)}`,
    ]);
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

    if (operation.result.ok) {
      return operation.ops.map(this.createEntityFromDBRecord);
    }

    throw new DBException('DAO -> create(...)', [
      `Collection name: ${this.collection.name}`,
      `Data: ${JSON.stringify(form, null, 2)}`,
    ]);
  }

  public async getOne(query: FilterQuery<U>): Promise<T> {
    const dbCollection = this.getDBCollection();
    const document = await dbCollection.findOne(query);

    if (document) {
      return this.createEntityFromDBRecord(document as WithId<U>);
    }

    throw new NotFoundException(
      'DAO -> getOne(...)',
      [
        `NOT_FOUND`,
        `Collection name: ${this.collection.name}`,
        `Query: ${JSON.stringify(query)}`,
      ],
      {
        key: 'E_NOT_FOUND',
        details: [],
      }
    );
  }

  public async getMany(
    query: FilterQuery<U>,
    options: FindOneOptions<U> = {}
  ): Promise<T[]> {
    const dbCollection = this.getDBCollection();
    const dbQuery = dbCollection.find(query, options as any);

    const documents = await dbQuery.toArray();

    if (documents.length > 0) {
      return documents.map((document) =>
        this.createEntityFromDBRecord(document as WithId<U>)
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
        this.createEntityFromDBRecord(document as WithId<U>)
      );
    }

    return [];
  }

  public async updateOne(
    query: FilterQuery<U>,
    updates: UpdateQuery<U> | Partial<U>,
    options?: UpdateOneOptions
  ): Promise<boolean> {
    const dbCollection = this.getDBCollection();

    const operation = await dbCollection.updateOne(query, updates, options);

    return operation.result.ok === 1;
  }

  public async getDBRecordField<K extends keyof U>(
    query: FilterQuery<U>,
    fieldName: K
  ): Promise<U[K]> {
    const dbCollection = this.getDBCollection();
    const document = await dbCollection.findOne(query);

    if (document) {
      return document[fieldName];
    }

    throw new NotFoundException('DAO -> getDBRecordField(...)', [
      `Collection name: ${this.collection.name}`,
      `Query: ${JSON.stringify(query)}`,
      `Field name: ${fieldName}`,
    ]);
  }

  public async getRecordsCount(query: FilterQuery<U>): Promise<number> {
    const dbCollection = this.getDBCollection();
    const count = await dbCollection.countDocuments(query);

    return count;
  }

  public async deleteOne(query: FilterQuery<U>): Promise<boolean> {
    const dbCollection = this.getDBCollection();
    const operation = await dbCollection.deleteOne(query);

    return operation.result.ok === 1;
  }

  public async deleteMany(query: FilterQuery<U>): Promise<boolean> {
    const dbCollection = this.getDBCollection();
    const operation = await dbCollection.deleteMany(query);

    return operation.result.ok === 1;
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async createIndex(
    fieldOrSpec: any,
    options?: IndexOptions
  ): Promise<void> {
    await this.getDBCollection().createIndex(fieldOrSpec, options);
  }

  private getDBCollection(): Collection<U> {
    return this.db.collection(this.collection.name);
  }

  private createEntityFromDBRecord(record: WithId<U>): T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = record;

    if (this.options.modelFactoryFunction) {
      return this.options.modelFactoryFunction((rest as unknown) as U);
    }

    return this.collection.createEntityFromDBRecord((rest as unknown) as U);
  }
}
