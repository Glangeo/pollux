import express from 'express';
import { Module } from '../module';
import { AppOptions } from './types';
export declare class App {
    readonly options: AppOptions;
    readonly name: string;
    readonly server: express.Express;
    private _isInitied;
    constructor(options?: AppOptions, name?: string);
    init(callback?: () => void): Promise<this>;
    listen(callback?: (port: number) => void): void;
    enableModules(): Promise<void>;
    addModule(module: Module): Promise<void>;
    addChildApp(app: App, path?: string): Promise<void>;
    protected beforeInit(): Promise<void>;
    protected afterInit(): Promise<void>;
    protected applyMiddleware(): Promise<void>;
}
