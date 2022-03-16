/**
 * Global configuration class. Singleton.
 * Used to store application specific data
 *
 * @todo remove methods: isDev(), isTest()
 */
export declare abstract class Config {
    /**
     * Indicates development bootstrap mode
     */
    static isDev(): boolean;
    /**
     * Indicates testing bootstrap mode
     */
    static isTest(): boolean;
    static getPort(): number;
    protected static safeGetEnvVar(name: string): string;
}
