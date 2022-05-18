export declare type RegistryMethodConfiguration = {
    factory: () => void;
    isMemoized?: boolean;
};
export declare type RegistryConfig = {
    [key: string]: RegistryMethodConfiguration;
};
