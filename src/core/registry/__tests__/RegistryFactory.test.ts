import { RegistryBuilder } from '../helpers';

describe('creates simple registry successfully', () => {
  it('creates empty registry', () => {
    const registry = new RegistryBuilder().build();

    expect(registry).toEqual({});
  });

  it('creates registry correctly', () => {
    const registry = new RegistryBuilder()
      .addMethod({
        key: 'getNumber',
        factory: () => 123,
      })
      .build();

    const number = registry.getNumber();

    expect(number).toEqual(123);
  });

  it('memoize method results', () => {
    const registry = new RegistryBuilder()
      .addMethod({
        key: 'getNumber',
        factory: () => Math.random(),
      })
      .build();

    const number1 = registry.getNumber();
    const number2 = registry.getNumber();

    expect(number1).toEqual(number2);
  });

  it('do not memoize method result if requested', () => {
    const registry = new RegistryBuilder()
      .addMethod({
        key: 'getNumber',
        factory: () => Math.random(),
        isMemoized: false,
      })
      .build();

    const number1 = registry.getNumber();
    const number2 = registry.getNumber();

    expect(number1).not.toEqual(number2);
  });

  it('allows to call already added methods', () => {
    const registry = new RegistryBuilder()
      .addMethod({
        key: 'getName',
        factory: () => 'Jon',
      })
      .addMethod({
        key: 'getGreeting',
        factory: (registry) => `Hi, ${registry.getName()}!`,
      })
      .build();

    const greeting = registry.getGreeting();

    expect(greeting).toEqual('Hi, Jon!');
  });

  it('allows to define custom parameter in factory function', () => {
    const registry = new RegistryBuilder()
      .addMethod({
        key: 'getGreeting',
        factory: (_, name: string) => `Hi, ${name}!`,
      })
      .build();

    const greeting = registry.getGreeting('Jon');

    expect(greeting).toEqual('Hi, Jon!');
  });

  it('allows to define multiple custom parameters in factory function', () => {
    const registry = new RegistryBuilder()
      .addMethod({
        key: 'getGreeting',
        factory: (_, firstName: string, lastName: string) =>
          `Hi, ${firstName} ${lastName}!`,
      })
      .build();

    const greeting = registry.getGreeting('Jon', 'Doe');

    expect(greeting).toEqual('Hi, Jon Doe!');
  });
});
