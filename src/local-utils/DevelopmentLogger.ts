/* eslint-disable no-console */

/**
 * @todo Implement way to enhance logger opportunities
 */
export type DevelopmentLoggerConfiguration = {
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
};

export enum DevLogEvent {
  // Application
  AppModuleAdded = 'app/moduleAdded',

  // Environment
  EnvFileLoaded = 'env/fileLoaded',

  // Router
  RouterIncomingRequest = 'router/incomimgRequests',
  RouterRouteAdded = 'router/routeAdded',

  // Database
  DbConnected = 'db/connected',
}

const defaultConfiguration: DevelopmentLoggerConfiguration = {
  isEnabled: true,
  app: {
    moduleAdded: true,
  },
  env: {
    fileLoaded: true,
  },
  router: {
    incomimgRequests: false,
    routeAdded: false,
  },
  db: {
    connected: true,
  },
};

export abstract class DevelopmentLogger {
  public static configuration: DevelopmentLoggerConfiguration = defaultConfiguration;

  public static LOG(event: DevLogEvent, msg: string): void {
    if (!this.configuration.isEnabled) {
      return;
    }

    const [groupKey, eventKey] = event.split('/');

    const isEnabled = (this.configuration as any)[groupKey]?.[eventKey];

    if (isEnabled) {
      console.log(DevelopmentLogger.FORMAT_LOG_MESSAGE(event, msg));
    }
  }

  public static WARN(msg: string): void {
    console.log(DevelopmentLogger.FORMAT_LOG_MESSAGE('WARNING', msg));
  }

  private static FORMAT_LOG_MESSAGE(event: string, msg: string): string {
    return `[DEV][${event}]: ${msg}`;
  }
}
