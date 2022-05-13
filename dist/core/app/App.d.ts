import express from 'express';
import { Module } from '../module';
import { AppOptions } from './types';
export declare class App {
    protected readonly options: AppOptions;
    readonly server: express.Express;
    protected readonly route: string;
    constructor(options?: AppOptions);
    init(callback?: () => void): Promise<this>;
    listen(callback?: (port: number) => void): void;
    enableModules(): Promise<void>;
    protected beforeInit(): Promise<void>;
    protected afterInit(): Promise<void>;
    protected addModule(module: Module): Promise<void>;
    protected addChildApp(app: App, path?: string): void;
    protected applyMiddleware(): Promise<void>;
}
