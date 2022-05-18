import { Registry, RegistryConfig } from '../types';

export function createRegistry<C extends RegistryConfig>(
  config: C
): Registry<C> {
  const registry: any = {};

  for (const key of Object.keys(config)) {
    const { factory, isMemoized = true } = config[key];

    if (isMemoized) {
      const memoizedResultKey = getMemoizedResultKey(key);

      registry[key] = () => {
        if (!registry[memoizedResultKey]) {
          registry[memoizedResultKey] = factory();
        }

        return registry[memoizedResultKey];
      };
    } else {
      registry[key] = factory;
    }
  }

  return registry;
}

function getMemoizedResultKey(key: string): string {
  return `__memoized_${key}`;
}
