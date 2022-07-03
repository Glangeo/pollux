import {
  Db,
  MongoClient,
  TransactionOptions,
  WithTransactionCallback,
} from 'mongodb';
import { InternalException } from 'src/core/exception/prebuild';
import { DevelopmentLogger, DevLogEvent } from 'src/local-utils';

export class MongoDB {
  private connection: MongoClient;

  public constructor(
    private readonly connectionUri: string,
    private readonly primaryDbName?: string
  ) {
    this.connection = new MongoClient(this.connectionUri);
  }

  public getDb(dbName?: string): Db {
    if (!dbName && !this.primaryDbName) {
      throw new InternalException({
        message: 'Database name was not specified!',
        meta: {
          description: [`Connection URI: ${this.connectionUri}`],
        },
      });
    }

    return this.connection.db(dbName || this.primaryDbName);
  }

  public async connect(): Promise<void> {
    await this.connection.connect();

    DevelopmentLogger.LOG(DevLogEvent.DbConnected, this.connectionUri);
  }

  public async disconnect(): Promise<void> {
    await this.connection.close();
  }

  public async doInsideTransaction<T>(
    action: WithTransactionCallback<T>,
    options?: TransactionOptions
  ): Promise<T> {
    const session = this.connection.startSession();

    try {
      return await session.withTransaction(action, options);
    } finally {
      await session.endSession();
    }
  }
}
