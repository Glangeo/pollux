import express from 'express';
import { Module } from '../module';
import { AppOptions } from './types';
export declare class App {
    readonly options: AppOptions;
    readonly server: express.Express;
    protected readonly route: string;
    constructor(options?: AppOptions);
    init(callback?: () => void): Promise<this>;
    listen(callback?: (port: number) => void): void;
    enableModules(): Promise<void>;
    addModule(module: Module): Promise<void>;
    addChildApp(app: App, path?: string): void;
    protected beforeInit(): Promise<void>;
    protected afterInit(): Promise<void>;
    protected applyMiddleware(): Promise<void>;
}
