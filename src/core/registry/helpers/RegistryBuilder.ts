import {
  Registry,
  RegistryConfig,
  RegistryMethodConfiguration,
} from '../types';

export class RegistryBuilder<C extends RegistryConfig<'', any, any[]>> {
  private config: C;

  public constructor() {
    this.config = {} as any;
  }

  public addMethod<M extends string, U, P extends any[]>(
    config: RegistryMethodConfiguration<M, U, Registry<C>, P>
  ): RegistryBuilder<C & RegistryConfig<M, U, P>> {
    const { key } = config;

    (this.config as any)[key] = config;

    return this as any;
  }

  public build(): Registry<C> {
    const registry: any = {};

    for (const value of Object.values(this.config)) {
      const {
        key,
        factory,
        isMemoized = true,
      } = value as unknown as typeof value[0];

      registry[key] = isMemoized
        ? this.GET_MEMOIZED_REGISTRY_METHOD(key, registry, factory)
        : this.GET_DEFAULT_REGISTRY_METHOD(registry, factory);
    }

    return registry;
  }

  private GET_DEFAULT_REGISTRY_METHOD(
    registry: any,
    factory: (registry: any, ...params: any) => any
  ) {
    return (...params: any) => factory(registry, ...params);
  }

  private GET_MEMOIZED_REGISTRY_METHOD(
    key: string,
    registry: any,
    factory: (registry: any, ...params: any) => any
  ) {
    return (...params: any) => {
      const memoizedKey = `__memoized_${key}`;

      if (!registry[memoizedKey]) {
        registry[memoizedKey] = factory(registry, ...params);
      }

      return registry[memoizedKey];
    };
  }
}
