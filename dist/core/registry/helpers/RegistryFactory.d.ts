import { Registry, RegistryConfig, RegistryMethodConfiguration } from '../types';
export declare class RegistryFactory<C extends RegistryConfig<'', any>> {
    private config;
    constructor();
    addMethod<M extends string, U>(config: RegistryMethodConfiguration<M, U, Registry<C>>): RegistryFactory<C & RegistryConfig<M, U>>;
    build(): Registry<C>;
    private GET_DEFAULT_REGISTRY_METHOD;
    private GET_MEMOIZED_REGISTRY_METHOD;
}
