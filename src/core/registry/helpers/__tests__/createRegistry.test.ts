import { createRegistry } from '../createRegistry';

describe('Creates registry correctly', () => {
  it('do not adds extra data to empty registry', () => {
    const registry = createRegistry({});

    expect(registry).toEqual({});
  });

  it('memoize return values of mehtods by default', () => {
    const registry = createRegistry({
      getNum: {
        factory: () => Math.random(),
      },
    });

    const num1 = registry.getNum();
    const num2 = registry.getNum();

    expect(num1).toEqual(num2);
  });

  it('do not memoize return values if requested', () => {
    const registry = createRegistry({
      getNum: {
        factory: () => Math.random(),
        isMemoized: false,
      },
    });

    const num1 = registry.getNum();
    const num2 = registry.getNum();

    expect(num1).not.toEqual(num2);
  });

  it('can memoize only requested methods, and do not memoize others', () => {
    const registry = createRegistry({
      getNum: {
        factory: () => Math.random(),
        isMemoized: false,
      },

      getNumMemoized: {
        factory: () => Math.random(),
      },
    });

    const num1 = registry.getNum();
    const num2 = registry.getNum();

    expect(num1).not.toEqual(num2);

    const memNum1 = registry.getNumMemoized();
    const memNum2 = registry.getNumMemoized();

    expect(memNum1).toEqual(memNum2);
  });
});
