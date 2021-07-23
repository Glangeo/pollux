export abstract class Config {
  protected static isLoggingEnabled: boolean;

  public static isDev(): boolean {
    const environment = process.env.ENV;

    if (environment === 'development') {
      return true;
    }

    return false;
  }

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

  public static setIsLoggingEnabled(isEnabled: boolean): void {
    this.isLoggingEnabled = isEnabled;
  }

  public static get IS_LOGGING_ENABLED(): boolean {
    return this.isLoggingEnabled;
  }

  protected static safeGetEnvVar(name: string): string {
    const variable = process.env[name];

    if (!variable) {
      throw new Error(`[ERROR][CONFIG] ${name} not defined in .env*`);
    }

    return variable;
  }
}
