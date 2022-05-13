import { App } from 'src/core';
import { getRequestEmitter } from '../helpers';
import { AppConfiguration, StartupConfig } from '../types';
import { ServiceRegistry } from './ServiceRegistry';

export class DistributedStartup {
  private currentApp: App | undefined;

  public constructor(protected readonly config: StartupConfig) {
    const { currentAppName, apps } = this.config;

    const isCurrentAppExist = apps.find(({ name }) => name === currentAppName);

    if (!isCurrentAppExist) {
      throw new Error(`Current app is not found in configuration!`);
    }

    for (const app of apps) {
      const isDetached = app.name !== currentAppName;

      if (isDetached) {
        this.initDetachedServices(app);
      } else {
        this.currentApp = this.getCurrentApp(app);
      }
    }
  }

  public init(...args: Parameters<App['init']>): ReturnType<App['init']> {
    if (!this.currentApp) {
      throw new Error(
        'this.currentApp is not initilized. Please, make an issue, this error should not be occured.'
      );
    }

    return this.currentApp.init(...args);
  }

  protected getCurrentApp(appConfig: AppConfiguration): App {
    const { app, port, services } = appConfig;

    for (const constructor of services) {
      const instance = new constructor();

      ServiceRegistry.setService(constructor, instance);

      const serviceApp = instance.getApp();

      app.addChildApp(
        serviceApp,
        serviceApp.options.baseRoute || constructor.name.toLowerCase()
      );
    }

    app.options.port = port;

    return app;
  }

  protected initDetachedServices(appConfig: AppConfiguration): void {
    const { name, host, services } = appConfig;

    for (const service of services) {
      const emitter = getRequestEmitter(service, async (request) => {
        // eslint-disable-next-line no-console
        console.log(
          `EMIT REQUEST TO APP ${name}
 HOSTED ON ${host}`,
          request
        );

        return { service: '', method: '', result: {} };
      });

      ServiceRegistry.setService(service, emitter as any);
    }
  }
}
