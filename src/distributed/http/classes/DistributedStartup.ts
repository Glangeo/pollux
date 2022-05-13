import { Axios } from 'axios';
import { App, castUnknownErrorToException } from 'src/core';
import { DevelopmentLogger, DevLogEvent, fixUrl } from 'src/local-utils';
import { createRemoteCallModule, getRequestEmitter } from '../helpers';
import { AppConfiguration, Contract, StartupConfig } from '../types';
import { ServiceRegistry } from './ServiceRegistry';

export class DistributedStartup {
  private readonly currentApp: App;

  public constructor(protected readonly config: StartupConfig) {
    const { currentAppName, apps } = this.config;

    const currentAppConfig = apps.find(({ name }) => name === currentAppName);

    if (!currentAppConfig) {
      throw new Error(`Current app is not found in configuration!`);
    }

    this.currentApp = this.getCurrentApp(currentAppConfig);

    for (const app of apps) {
      const isDetached = app.name !== currentAppName;

      if (isDetached) {
        this.initDetachedServices(app);
      }
    }
  }

  public init(...args: Parameters<App['init']>): ReturnType<App['init']> {
    return this.currentApp.init(...args);
  }

  protected getCurrentApp(appConfig: AppConfiguration): App {
    const { app, port, services } = appConfig;

    for (const constructor of services) {
      const instance = new constructor();

      ServiceRegistry.setService(constructor, instance);

      const serviceApp = instance.getApp();

      app.addChildAppToQueue(
        serviceApp,
        serviceApp.options.baseRoute || constructor.name.toLowerCase()
      );
    }

    const remoteCallModule = createRemoteCallModule(services);
    app.addModuleToQueue(remoteCallModule);

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
          const response = await axios.post<string>(
            '/call',
            JSON.stringify(request),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const { result, service, method } = JSON.parse(
            response.data
          ) as Contract.Response;

          DevelopmentLogger.LOG(
            DevLogEvent.DistributedRemoteCallResponded,
            `from ${host} after call ${service}.${method}`
          );

          return { result, service, method };
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
