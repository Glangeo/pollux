import { Db } from 'mongodb';
export declare class MongoDB {
    private readonly connectionUrl;
    private readonly PRIMARY_DB_NAME;
    private connection;
    constructor(connectionUrl: string, PRIMARY_DB_NAME: string);
    get PRIMARY_DB(): Db;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
}
