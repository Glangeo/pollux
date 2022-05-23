import { Axios } from 'axios';
import { App } from 'src/api';
import { castUnknownErrorToException } from 'src/core';
import { DevelopmentLogger, DevLogEvent, fixUrl } from 'src/local-utils';
import { createRemoteCallModule, getRequestEmitter } from '../helpers';
import {
  AppConfiguration,
  Contract,
  ServiceConstructor,
  StartupConfig,
} from '../types';
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

    for (const config of apps) {
      const isDetached = config.name !== currentAppName;

      if (isDetached) {
        this.initDetachedServices(config);
      }
    }
  }

  public init(...args: Parameters<App['init']>): ReturnType<App['init']> {
    return this.currentApp.init(...args);
  }

  protected getCurrentApp(appConfig: AppConfiguration): App {
    const { app, port, childApps = [] } = appConfig;

    const services: Set<ServiceConstructor> = new Set();

    const addServiceToRegistry = (service: ServiceConstructor) => {
      if (!services.has(service)) {
        services.add(service);

        const instance = new service();

        ServiceRegistry.setService(service, instance);
      }
    };

    for (const service of app.services) {
      addServiceToRegistry(service);
    }

    for (const child of childApps) {
      for (const service of child.services) {
        addServiceToRegistry(service);
      }

      app.addChildAppToQueue(child, child.options.baseRoute || child.name);
    }

    const remoteCallModule = createRemoteCallModule(
      Array.from(services.values())
    );
    app.addModuleToQueue(remoteCallModule);

    app.options.port = port;

    return app;
  }

  protected initDetachedServices(appConfig: AppConfiguration): void {
    const { app, host, childApps = [] } = appConfig;

    const baseAppRoute = app.options.baseRoute || app.name;
    const services: Set<ServiceConstructor> = new Set();

    const fillServiceRegistryWithEmittersByApp = (app: App) => {
      for (const service of app.services) {
        if (services.has(service)) {
          throw new Error(
            `${service.name} was already added to registry by other application. Multiple instances of the same service are not allowed.`
          );
        }

        const emitter = getRequestEmitter(service, async (request) => {
          // TODO: move somewhere
          const detachedRouterRoute = '/detached';

          const axios = new Axios({
            baseURL: fixUrl(
              [host, baseAppRoute, detachedRouterRoute].join('/')
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

            const { data } = JSON.parse(response.data) as {
              status: string;
              data: Contract.Response;
            };
            const { result, service, method } = data;

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
    };

    fillServiceRegistryWithEmittersByApp(app);

    for (const child of childApps) {
      fillServiceRegistryWithEmittersByApp(child);
    }
  }
}
