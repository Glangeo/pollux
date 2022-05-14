import express from 'express';
import { ServiceConstructor } from '../../distributed/http';
import { Module } from '../module';
import { AppOptions } from './types';
export declare class App {
    readonly options: AppOptions;
    readonly name: string;
    readonly server: express.Express;
    services: ServiceConstructor[];
    private _isInitied;
    private modulesQueue;
    private childAppQueue;
    constructor(options?: AppOptions, name?: string);
    init(callback?: () => void): Promise<this>;
    listen(callback?: (port: number) => void): void;
    enableModules(): Promise<void>;
    addModuleToQueue(module: Module): void;
    addChildAppToQueue(app: App, path?: string): void;
    protected addModule(module: Module): Promise<void>;
    protected addChildApp(app: App, path?: string): Promise<void>;
    protected beforeInit(): Promise<void>;
    protected afterInit(): Promise<void>;
    protected applyMiddleware(): Promise<void>;
}
