import { RegistryMethodConfiguration } from './RegistryMethodConfiguration';
export declare type RegistryConfig<M extends string, U, P extends any[]> = {
    [K in M]: [RegistryMethodConfiguration<K, U, any, P>, P];
};
