import { RegistryMethodConfiguration } from './RegistryMethodConfiguration';
export declare type RegistryConfig<M extends string, U> = {
    [K in M]: RegistryMethodConfiguration<K, U, any>;
};
