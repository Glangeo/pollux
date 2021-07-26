export declare abstract class Config {
    protected static isLoggingEnabled: boolean;
    static isDev(): boolean;
    static isTest(): boolean;
    static getPort(): number;
    static setIsLoggingEnabled(isEnabled: boolean): void;
    static get IS_LOGGING_ENABLED(): boolean;
    protected static safeGetEnvVar(name: string): string;
}
