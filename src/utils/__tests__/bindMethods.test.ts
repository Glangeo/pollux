import { bindMethods } from '../bindMethods';

describe('binds methods in class', () => {
  @bindMethods
  class Sample {
    public constructor(protected name: string) {}

    public static GET_GREETING(): string {
      return 'Hello, ';
    }

    public getName(): string {
      return this.name;
    }

    public setName(value: string): void {
      this.name = value;
    }

    public getNameComputed = () => this.name;

    public get Name(): string {
      return this.name;
    }
  }

  const NAME = 'Jhon';
  const sample = new Sample(NAME);

  it('binds methods correcly', () => {
    const method = sample.getName;
    const name = method();

    expect(name).toBe(NAME);
  });

  it('does not modify direct method call', () => {
    expect(sample.getName()).toBe(NAME);
  });

  it('saves all static methods and properties', () => {
    expect(Sample.GET_GREETING()).toBe('Hello, ');
  });

  it('do not change computed function properties', () => {
    const method = sample.getNameComputed;

    expect(method()).toBe(NAME);
  });

  it('does not change behaviour of getters and setters', () => {
    expect(sample.Name).toBe(NAME);

    sample.setName('Jeff');

    expect(sample.Name).toBe('Jeff');
  });

  it('saves constructor.name', () => {
    expect(sample.constructor.name).toBe('Sample');
  });
});
