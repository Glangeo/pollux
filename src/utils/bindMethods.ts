export function bindMethods<T extends new (...args: any[]) => any>(cls: T): T {
  const constructorWithAutoBind = (...args: any) => {
    const instance = new cls(...args);

    // Bind all methods to instsance
    for (const key of Object.keys(cls.prototype)) {
      const property = cls.prototype[key];

      if (typeof property === 'function') {
        instance[key] = property.bind(instance);
      }
    }

    return instance;
  };

  // Save all static methods and properties
  for (const key of Object.getOwnPropertyNames(cls)) {
    const descriptor = Object.getOwnPropertyDescriptor(cls, key);

    Object.defineProperty(constructorWithAutoBind, key, {
      ...descriptor,
    });
  }

  return constructorWithAutoBind as unknown as T;
}
