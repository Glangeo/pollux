export interface IAppOptions {
    /**
     * Application URL route. If provided, all application modules will use this route prefix
     */
    baseRoute?: string;
    /**
     * Load environment files.
     * Commonly disabled when app used as a child of another app
     *
     * @default true
     */
    shouldLoadEnvFiles?: boolean;
    /**
     * Enable dev logs
     *
     * @deprecated
     */
    areLogsEnabled?: boolean;
}
