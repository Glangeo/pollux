import {
  Registry,
  RegistryConfig,
  RegistryMethodConfiguration,
} from '../types';

export class RegistryFactory<C extends RegistryConfig<'', any>> {
  private config: C;

  public constructor() {
    this.config = {} as any;
  }

  public addMethod<M extends string, U>(
    config: RegistryMethodConfiguration<M, U, Registry<C>>
  ): RegistryFactory<C & RegistryConfig<M, U>> {
    const { key } = config;

    (this.config as any)[key] = config;

    return this as any;
  }

  public build(): Registry<C> {
    const registry: any = {};

    for (const value of Object.values(this.config)) {
      const { key, factory, isMemoized = true } = value;

      registry[key] = isMemoized
        ? this.GET_MEMOIZED_REGISTRY_METHOD(key, registry, factory)
        : this.GET_DEFAULT_REGISTRY_METHOD(registry, factory);
    }

    return registry;
  }

  private GET_DEFAULT_REGISTRY_METHOD(
    registry: any,
    factory: (registry: any) => any
  ) {
    return () => factory(registry);
  }

  private GET_MEMOIZED_REGISTRY_METHOD(
    key: string,
    registry: any,
    factory: (registry: any) => any
  ) {
    return () => {
      const memoizedKey = `__memoized_${key}`;

      if (!registry[memoizedKey]) {
        registry[memoizedKey] = factory(registry);
      }

      return registry[memoizedKey];
    };
  }
}
