import { App } from '../../../core';
import { ServiceConstructor } from './ServiceConstructor';
export declare type AppConfiguration = {
    readonly app: App;
    readonly name: string;
    readonly host: string;
    readonly port: number;
    readonly services: ServiceConstructor[];
};
