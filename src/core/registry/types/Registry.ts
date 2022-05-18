import { RegistryConfig } from './RegistryConfig';

export type Registry<C extends RegistryConfig> = {
  [K in keyof C]: C[K]['factory'];
};
