import { Db, TransactionOptions, WithTransactionCallback } from 'mongodb';
export declare class MongoDB {
    private readonly connectionUri;
    private readonly primaryDbName?;
    private connection;
    constructor(connectionUri: string, primaryDbName?: string | undefined);
    getDb(dbName?: string): Db;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    doInsideTransaction<T>(action: WithTransactionCallback<T>, options?: TransactionOptions): Promise<T>;
}
