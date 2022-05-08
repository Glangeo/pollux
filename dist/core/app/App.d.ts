import express from 'express';
import { Module } from '../module';
import { AppOptions } from './types';
export declare abstract class App {
    private readonly options;
    readonly server: express.Express;
    protected readonly route: string;
    constructor(options?: AppOptions);
    init(callback?: () => void): Promise<this>;
    listen(callback?: (port: number) => void): void;
    abstract enableModules(): Promise<void>;
    protected beforeInit(): Promise<void>;
    protected afterInit(): Promise<void>;
    protected addModule(module: Module): Promise<void>;
    protected applyMiddleware(): Promise<void>;
}
