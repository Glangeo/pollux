import { Registry } from './Registry';
export declare type RegistryMethodConfiguration<K extends string, U, R extends Registry<any>, P extends any[]> = {
    key: K;
    isMemoized?: boolean;
    factory: (registry: R, ...params: P) => U;
};
