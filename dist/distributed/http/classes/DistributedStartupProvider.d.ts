import { App } from '../../../core';
import { IDistributedService } from '../interfaces/IDistributedService';
import { StartupConfig } from '../types';
export declare class DistributedStartupProvider {
    protected readonly appClass: typeof App;
    protected readonly current: StartupConfig.App;
    protected readonly config: StartupConfig.Global;
    protected readonly services: (new () => IDistributedService)[];
    constructor(appClass: typeof App, current: StartupConfig.App, config: StartupConfig.Global, services: (new () => IDistributedService)[]);
    getCurrentApp(): App;
    private isCurrentServiceMissing;
}
