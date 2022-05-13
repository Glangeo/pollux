import { AppOptions } from '../../../core';
export declare namespace StartupConfig {
    type Global = {
        combined: {
            services: string[];
            url: string;
        };
        detached: {
            name: string;
            url: string;
        }[];
    };
    type App = {
        name: string;
        options: {
            app: AppOptions;
        };
    };
}
