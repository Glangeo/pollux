/**
 * @todo Implement way to enhance logger opportunities
 */
export declare type DevelopmentLoggerConfiguration = {
    /**
     * Whether logger enabled or not
     */
    isEnabled: boolean;
    /**
     * Application
     */
    app: {
        /**
         * Module is added to application
         */
        moduleAdded: boolean;
    };
    /**
     * Environment variables
     */
    env: {
        /**
         * .env file is loaded into process.ENV
         */
        fileLoaded: boolean;
    };
    /**
     * Database
     */
    db: {
        /**
         * Connection to database is established
         */
        connected: boolean;
    };
};
export declare enum DevLogEvent {
    AppModuleAdded = "app/module-added",
    EnvFileLoaded = "env/file-loaded",
    DbConnected = "db/connected"
}
export declare abstract class DevelopmentLogger {
    static configuration: DevelopmentLoggerConfiguration;
    static LOG(event: DevLogEvent, msg: string): void;
    private static FORMAT_LOG_MESSAGE;
}
