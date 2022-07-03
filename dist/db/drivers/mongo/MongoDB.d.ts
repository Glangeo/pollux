import { Db, TransactionOptions, WithTransactionCallback } from 'mongodb';
import { ExceptionHandler } from '../../../core';
export declare class MongoDB {
    private readonly connectionUri;
    private readonly primaryDbName?;
    private connection;
    constructor(connectionUri: string, primaryDbName?: string | undefined);
    getDb(dbName?: string): Db;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    doInsideTransaction(action: WithTransactionCallback<void>, options: TransactionOptions, exceptionHandler: ExceptionHandler): Promise<void>;
}
