import { App } from '../../../core';
export declare type AppConfiguration = {
    readonly app: App;
    readonly host: string;
    readonly port: number;
    readonly childApps?: App[];
};
