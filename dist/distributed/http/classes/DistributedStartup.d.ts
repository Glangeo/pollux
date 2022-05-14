import { App } from '../../../core';
import { AppConfiguration, StartupConfig } from '../types';
export declare class DistributedStartup {
    protected readonly config: StartupConfig;
    private readonly currentApp;
    constructor(config: StartupConfig);
    init(...args: Parameters<App['init']>): ReturnType<App['init']>;
    protected getCurrentApp(appConfig: AppConfiguration): App;
    protected initDetachedServices(appConfig: AppConfiguration): void;
}
