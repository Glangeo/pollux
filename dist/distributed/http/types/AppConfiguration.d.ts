import { App } from '../../../api';
export declare type AppConfiguration = {
    readonly app: App;
    readonly name: string;
    readonly host: string;
    readonly port: number;
    readonly childApps?: App[];
};
