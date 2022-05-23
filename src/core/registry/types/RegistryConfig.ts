import { RegistryMethodConfiguration } from './RegistryMethodConfiguration';

export type RegistryConfig<M extends string, U> = {
  [K in M]: RegistryMethodConfiguration<K, U, any>;
};
