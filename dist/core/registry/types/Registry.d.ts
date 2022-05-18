import { RegistryConfig } from './RegistryConfig';
export declare type Registry<C extends RegistryConfig> = {
    [K in keyof C]: C[K]['factory'];
};
