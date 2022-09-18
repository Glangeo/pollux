import { Registry, RegistryConfig, RegistryMethodConfiguration } from '../types';
export declare class RegistryBuilder<C extends RegistryConfig<'', any, any[]>> {
    private config;
    constructor();
    addMethod<M extends string, U, P extends any[]>(config: RegistryMethodConfiguration<M, U, Registry<C>, P>): RegistryBuilder<C & RegistryConfig<M, U, P>>;
    build(): Registry<C>;
    private GET_DEFAULT_REGISTRY_METHOD;
    private GET_MEMOIZED_REGISTRY_METHOD;
}
