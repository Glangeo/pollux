import { App } from 'src/core';
import { getRequestEmitter } from '../helpers';
import { IDistributedService } from '../interfaces/IDistributedService';
import { StartupConfig } from '../types';
import { ServiceRegistry } from './ServiceRegistry';

export class DistributedStartupProvider {
  public constructor(
    protected readonly appClass: typeof App,
    protected readonly current: StartupConfig.App,
    protected readonly config: StartupConfig.Global,
    protected readonly services: (new () => IDistributedService)[]
  ) {
    if (this.isCurrentServiceMissing()) {
      throw new Error(
        `Current service (${this.current.name}) is missing in configuration!`
      );
    }

    ServiceRegistry.setCurrentServiceName(this.current.name);

    const { combined, detached } = this.config;

    for (const serviceName of combined.services) {
      const constructor = this.services.find(
        (service) => service.name === serviceName
      );

      if (!constructor) {
        throw new Error(`Could not find ${serviceName} constructor!`);
      }

      ServiceRegistry.setService(constructor, new constructor());
    }

    for (const { name, url } of detached) {
      const constructor = this.services.find(
        (service) => service.name === name
      );

      if (!constructor) {
        throw new Error(`Could not find ${name} constructor!`);
      }

      ServiceRegistry.setService(
        constructor,
        getRequestEmitter(constructor, async (request) => {
          // TODO: send request some where
          // eslint-disable-next-line no-console
          console.log(
            `EMIT FOR ${constructor.name} WITH REQUEST: `,
            request,
            ` TO URL: ${url}`
          );

          return undefined as any;
        }) as any
      );
    }
  }

  public getCurrentApp(): App {
    const app = new this.appClass(this.current.options.app);

    return app;
  }

  private isCurrentServiceMissing(): boolean {
    const name = this.current.name;

    const isInCombinedApp = this.config.combined.services.includes(name);
    const isDetachedService = this.config.detached.find(
      (service) => service.name === name
    );

    return !(isInCombinedApp || isDetachedService);
  }
}
