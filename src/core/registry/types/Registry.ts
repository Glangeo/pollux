import { RegistryConfig } from './RegistryConfig';

export type Registry<C extends RegistryConfig<string, any, any[]>> = {
  [K in keyof C]: (...params: C[K][1]) => ReturnType<C[K][0]['factory']>;
};
