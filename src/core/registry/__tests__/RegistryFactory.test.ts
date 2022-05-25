import { RegistryBuilder } from '../helpers';

describe('creates simple registry successfuly', () => {
  it('creates empty registry', () => {
    const registry = new RegistryBuilder().build();

    expect(registry).toEqual({});
  });

  it('creates registry correclty', () => {
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

  it('do not moemize method result if requested', () => {
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
        factory: () => 'Jhon',
      })
      .addMethod({
        key: 'getGreeting',
        factory: (registry) => `Hi, ${registry.getName()}!`,
      })
      .build();

    const greeting = registry.getGreeting();

    expect(greeting).toEqual('Hi, Jhon!');
  });
});
