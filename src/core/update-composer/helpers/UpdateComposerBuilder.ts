import { upperFirst } from 'lodash';
import { UpdateComposer } from '../types';
import { SettersMap } from '../types/SettersMap';

export class UpdateComposerBuilder<
  T extends { [key: string]: any },
  S extends SettersMap<'', any, any> = { '': () => '' }
> {
  protected map: S;

  public constructor() {
    this.map = {} as any;
  }

  public addSetter<
    K extends keyof T,
    P extends T[K] = T[K],
    R extends T[K] | Promise<T[K]> = T[K]
  >(
    key: K,
    setter: (value: P) => R = (value: P) => value
  ): UpdateComposerBuilder<T, S & SettersMap<string & K, P, R>> {
    (this.map as any)[key] = setter;

    return this as any;
  }

  public build<R extends any | Promise<any>>(
    onUpdate: (changes: Partial<T>) => R
  ): UpdateComposer<S, R> {
    const composer: any = {
      changes: {},
    };

    // Create setters
    const getWrappedSetter = (key: string) => {
      const setter = (this.map as any)[key];

      if (!setter) {
        throw new Error(`Setter was not added for key: ${key}`);
      }

      return (value: any) => {
        const nextValue = setter(value);

        if (nextValue instanceof Promise) {
          return new Promise((resolve) => {
            nextValue.then((value) => {
              composer.changes[key] = value;

              resolve(value);
            });
          });
        }

        composer.changes[key] = nextValue;

        return nextValue;
      };
    };

    for (const key of Object.keys(this.map)) {
      composer[`set${upperFirst(key)}`] = getWrappedSetter(key);
    }

    composer.set = (key: string, value: any) => getWrappedSetter(key)(value);

    // Create update method
    composer.update = () => onUpdate(composer.changes);

    return composer;
  }
}
