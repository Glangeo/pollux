import { Registry, RegistryConfig, RegistryMethodConfiguration } from '../types';
export declare class RegistryBuilder<C extends RegistryConfig<'', any>> {
    private config;
    constructor();
    addMethod<M extends string, U>(config: RegistryMethodConfiguration<M, U, Registry<C>>): RegistryBuilder<C & RegistryConfig<M, U>>;
    build(): Registry<C>;
    private GET_DEFAULT_REGISTRY_METHOD;
    private GET_MEMOIZED_REGISTRY_METHOD;
}
