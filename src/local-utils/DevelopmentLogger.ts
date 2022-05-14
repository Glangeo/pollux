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

export enum DevLogEvent {
  // Application
  AppInit = 'app/init',
  AppModuleAdded = 'app/moduleAdded',
  AppChildAdded = 'app/childAppAdded',

  // Environment
  EnvFileLoaded = 'env/fileLoaded',

  // Router
  RouterIncomingRequest = 'router/incomimgRequests',
  RouterRouteAdded = 'router/routeAdded',

  // Database
  DbConnected = 'db/connected',

  // Distributed
  DistributedDetachedServiceAdded = 'distributed/detachedServiceAdded',
  DistributedRemoteCallReceived = 'distributed/remoteCallReceived',
  DistributedRemoteCallResponded = 'distributed/remoteCallResponded',
}

const defaultConfiguration: DevelopmentLoggerConfiguration = {
  isEnabled: true,
  app: {
    init: true,
    moduleAdded: true,
    childAppAdded: true,
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
  distributed: {
    detachedServiceAdded: false,
    remoteCallReceived: false,
    remoteCallResponded: false,
  },
};

export abstract class DevelopmentLogger {
  public static configuration: DevelopmentLoggerConfiguration =
    defaultConfiguration;

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
