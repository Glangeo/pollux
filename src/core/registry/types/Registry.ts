import { RegistryConfig } from './RegistryConfig';

export type Registry<C extends RegistryConfig<string, any>> = {
  [K in keyof C]: () => ReturnType<C[K]['factory']>;
};
