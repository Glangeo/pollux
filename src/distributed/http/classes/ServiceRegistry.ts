import { IDistributedService } from '../interfaces/IDistributedService';

export abstract class ServiceRegistry {
  protected static currentServiceName: string | undefined;
  protected static readonly registry: {
    [key: string]: IDistributedService | undefined;
  } = {};

  public static setCurrentServiceName(name: string): void {
    this.currentServiceName = name;
  }

  public static setService<T extends new (args: any[]) => IDistributedService>(
    service: T,
    instance: InstanceType<T>
  ): void {
    this.registry[service.name] = instance;
  }

  public static getService<T extends new (args: any[]) => IDistributedService>(
    service: T
  ): InstanceType<T> {
    const instance = this.registry[service.name];

    if (!instance) {
      throw new Error(
        `Service ${service.name} was not added to the registry. Check your configuration file`
      );
    }

    return instance as InstanceType<T>;
  }
}
