import { RegistryMethodConfiguration } from './RegistryMethodConfiguration';

export type RegistryConfig<M extends string, U, P extends any[]> = {
  [K in M]: [RegistryMethodConfiguration<K, U, any, P>, P];
};
