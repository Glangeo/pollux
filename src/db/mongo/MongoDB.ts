import { Db, MongoClient } from 'mongodb';
import { InternalException } from '../../exception';
import { Config } from '../../config';

export class MongoDB {
  private connection: MongoClient | undefined;

  public constructor(
    private readonly connectionUrl: string,
    private readonly PRIMARY_DB_NAME: string
  ) {}

  public get PRIMARY_DB(): Db {
    if (!this.connection) {
      throw new InternalException('MongoDB -> get PRIMARY_DB', [
        'MongoDB is not connected!',
      ]);
    }

    return this.connection?.db(this.PRIMARY_DB_NAME);
  }

  public async connect(): Promise<void> {
    if (!this.isConnected()) {
      this.connection = await MongoClient.connect(this.connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      if (Config.IS_LOGGING_ENABLED) {
        // eslint-disable-next-line no-console
        console.log(`[LOGS][DB] MongoDB connected: ${this.connectionUrl}`);
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected()) {
      await this.connection?.close();
    }
  }

  public isConnected(): boolean {
    return Boolean(this.connection);
  }
}
