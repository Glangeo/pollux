import { RegistryConfig } from './RegistryConfig';
export declare type Registry<C extends RegistryConfig<string, any, any[]>> = {
    [K in keyof C]: (...params: C[K][1]) => ReturnType<C[K][0]['factory']>;
};
