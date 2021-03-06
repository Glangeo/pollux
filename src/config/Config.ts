/**
 * Global configuration class. Singleton.
 * Used to store application specific data
 *
 * @todo remove methods: isDev(), isTest()
 */
export abstract class Config {
  /**
   * Indicates development bootstrap mode
   */
  public static isDev(): boolean {
    const environment = process.env.ENV;

    if (environment === 'development') {
      return true;
    }

    return false;
  }

  /**
   * Indicates testing bootstrap mode
   */
  public static isTest(): boolean {
    const environment = process.env.ENV;

    if (environment === 'test') {
      return true;
    }

    return false;
  }

  public static getPort(): number {
    return Number(this.safeGetEnvVar('PORT'));
  }

  protected static safeGetEnvVar(name: string): string {
    const variable = process.env[name];

    if (!variable) {
      throw new Error(`[ERROR][CONFIG] ${name} not defined in .env*`);
    }

    return variable;
  }
}
