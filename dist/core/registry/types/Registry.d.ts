import { RegistryConfig } from './RegistryConfig';
export declare type Registry<C extends RegistryConfig<string, any>> = {
    [K in keyof C]: () => ReturnType<C[K]['factory']>;
};
