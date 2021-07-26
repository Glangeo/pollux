import express from 'express';
import { IModule } from '../module';
import { IAppOptions } from './types';
export declare abstract class App {
    private readonly options?;
    private readonly route;
    private readonly server;
    constructor(options?: IAppOptions | undefined);
    init(callback?: () => void): Promise<this>;
    getExpressApp(): express.Express;
    listen(callback?: (port: number) => void): void;
    abstract enableModules(): void;
    protected beforeInit(): Promise<void>;
    protected afterInit(): Promise<void>;
    protected addModule(module: IModule): Promise<void>;
    protected applyHeaders(): void;
    protected applyMiddleware(): void;
    private static _beforeInit;
}
