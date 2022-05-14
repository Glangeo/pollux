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
         * Init method called on application
         */
        init: boolean;
        /**
         * Module is added to application
         */
        moduleAdded: boolean;
        /**
         * Child app is added to application
         */
        childAppAdded: boolean;
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
     * Router logs
     */
    router: {
        incomimgRequests: boolean;
        routeAdded: boolean;
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
    /**
     * Distributed mode logging
     */
    distributed: {
        /**
         * Added layer for remote calling methods in other service
         */
        detachedServiceAdded: boolean;
        /**
         * Received call from another service
         */
        remoteCallReceived: boolean;
        /**
         * Sent response to another service
         */
        remoteCallResponded: boolean;
    };
};
export declare enum DevLogEvent {
    AppInit = "app/init",
    AppModuleAdded = "app/moduleAdded",
    AppChildAdded = "app/childAppAdded",
    EnvFileLoaded = "env/fileLoaded",
    RouterIncomingRequest = "router/incomimgRequests",
    RouterRouteAdded = "router/routeAdded",
    DbConnected = "db/connected",
    DistributedDetachedServiceAdded = "distributed/detachedServiceAdded",
    DistributedRemoteCallReceived = "distributed/remoteCallReceived",
    DistributedRemoteCallResponded = "distributed/remoteCallResponded"
}
export declare abstract class DevelopmentLogger {
    static configuration: DevelopmentLoggerConfiguration;
    static LOG(event: DevLogEvent, msg: string): void;
    static WARN(msg: string): void;
    private static FORMAT_LOG_MESSAGE;
}
