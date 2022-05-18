export type RegistryMethodConfiguration = {
  factory: () => void;
  isMemoized?: boolean;
};

export type RegistryConfig = {
  [key: string]: RegistryMethodConfiguration;
};
