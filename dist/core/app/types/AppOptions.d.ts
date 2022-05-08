import { DevelopmentLoggerConfiguration } from '../../../local-utils';
import { DeepPartial } from 'utility-types';
export declare type AppOptions = {
    /**
     * Port, that will be used by server
     */
    port?: number;
    /**
     * Application URL route. If provided, all application modules will use this route prefix
     */
    baseRoute?: string;
    /**
     * Logging configuration
     */
    logging?: DeepPartial<DevelopmentLoggerConfiguration>;
};
