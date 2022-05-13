import { App } from '../../../core';
import { AppConfiguration, StartupConfig } from '../types';
export declare class DistributedStartup {
    protected readonly config: StartupConfig;
    constructor(config: StartupConfig);
    init(...args: Parameters<App['init']>): Promise<App>;
    protected getCurrentApp(appConfig: AppConfiguration): Promise<App>;
    protected initDetachedServices(appConfig: AppConfiguration): void;
}
