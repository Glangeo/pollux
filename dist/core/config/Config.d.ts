import { Environment } from './types';
/**
 * Global configuration class. Singleton.
 * Used to store application specific data
 */
export declare abstract class Config {
    /**
     * Returns app startup environment
     *
     * @returns current environment
     */
    static getEnvironment(): Environment;
    /**
     * Gets environment variable value and throws error if value is missing
     *
     * @param name variable name
     * @returns variables value from .env files
     */
    protected static safeGetEnvVar(name: string): string;
}
