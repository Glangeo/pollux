import { getRequestEmitter } from '../getRequestEmitter';

describe('makes emitter with same methods correctly', () => {
  class SomeService {
    public sayHi(): void {}

    public sayBye(): void {}

    public arrowed = () => {};
  }

  const emitter = getRequestEmitter(SomeService, () => null as any);

  it('mimics methods declared using FD', () => {
    expect(emitter.sayHi).toBeDefined();
    expect(emitter.sayBye).toBeDefined();
  });

  it('also mimics methods declared using FE', () => {
    expect(emitter.arrowed).toBeDefined();
  });
});
