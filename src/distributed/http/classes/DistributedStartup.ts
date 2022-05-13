import { Axios } from 'axios';
import { App, castUnknownErrorToException } from 'src/core';
import { DevelopmentLogger, DevLogEvent, fixUrl } from 'src/local-utils';
import { createRemoteCallModule, getRequestEmitter } from '../helpers';
import { AppConfiguration, Contract, StartupConfig } from '../types';
import { ServiceRegistry } from './ServiceRegistry';

export class DistributedStartup {
  public constructor(protected readonly config: StartupConfig) {}

  public async init(...args: Parameters<App['init']>): Promise<App> {
    const { currentAppName, apps } = this.config;

    const currentAppConfig = apps.find(({ name }) => name === currentAppName);

    if (!currentAppConfig) {
      throw new Error(`Current app is not found in configuration!`);
    }

    const app = await this.getCurrentApp(currentAppConfig);

    for (const app of apps) {
      const isDetached = app.name !== currentAppName;

      if (isDetached) {
        this.initDetachedServices(app);
      }
    }

    return app.init(...args);
  }

  protected async getCurrentApp(appConfig: AppConfiguration): Promise<App> {
    const { app, port, services } = appConfig;

    for (const constructor of services) {
      const instance = new constructor();

      ServiceRegistry.setService(constructor, instance);

      const serviceApp = instance.getApp();
      const remoteCallModule = createRemoteCallModule(services);

      await serviceApp.addModule(remoteCallModule);

      await app.addChildApp(
        serviceApp,
        serviceApp.options.baseRoute || constructor.name.toLowerCase()
      );
    }

    app.options.port = port;

    return app;
  }

  protected initDetachedServices(appConfig: AppConfiguration): void {
    const { app, host, services } = appConfig;

    for (const service of services) {
      const emitter = getRequestEmitter(service, async (request) => {
        // TODO: move somewhere
        const detachedRouterRoute = '/detached';

        const axios = new Axios({
          baseURL: fixUrl(
            [host, app.options.baseRoute || '', detachedRouterRoute].join('/')
          ),
        });

        // TODO: add authorization
        try {
          const response = await axios.post<Contract.Response>(
            '/call',
            request
          );

          const { service, method } = response.data;

          DevelopmentLogger.LOG(
            DevLogEvent.DistributedRemoteCallResponded,
            `from ${host} after call ${service}.${method}`
          );

          return response.data;
        } catch (error) {
          // TODO: retrieve exception from service response
          const exception = castUnknownErrorToException(error);

          throw exception;
        }
      });

      ServiceRegistry.setService(service, emitter as any);

      DevelopmentLogger.LOG(
        DevLogEvent.DistributedDetachedServiceAdded,
        service.name
      );
    }
  }
}
