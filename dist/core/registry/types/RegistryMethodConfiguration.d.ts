import { Registry } from './Registry';
export declare type RegistryMethodConfiguration<K extends string, U, R extends Registry<any>> = {
    key: K;
    isMemoized?: boolean;
    factory: (registry: R) => U;
};
