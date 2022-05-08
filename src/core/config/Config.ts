import { Environment } from './types';

/**
 * Global configuration class. Singleton.
 * Used to store application specific data
 */
export abstract class Config {
  /**
   * Returns app startup environment
   *
   * @returns current environment
   */
  public static getEnvironment(): Environment {
    const env = (process.env.NODE_ENV as Environment) || Environment.Production;

    const environments = [
      Environment.Development,
      Environment.Testing,
      Environment.Demo,
      Environment.Production,
    ];

    if (environments.includes(env)) {
      return env;
    }

    return Environment.Production;
  }

  /**
   * Gets environment variable value and throws error if value is missing
   *
   * @param name variable name
   * @returns variables value from .env files
   */
  protected static safeGetEnvVar(name: string): string {
    const variable = process.env[name];

    if (!variable) {
      throw new Error(`[ERROR][CONFIG] ${name} not defined in .env*`);
    }

    return variable;
  }
}
