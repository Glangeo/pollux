import { UpdateComposer } from '../types';
import { SettersMap } from '../types/SettersMap';
export declare class UpdateComposerBuilder<T extends {
    [key: string]: any;
}, S extends SettersMap<'', any, any> = {
    '': () => '';
}> {
    protected map: S;
    constructor();
    addSetter<K extends keyof T, P extends T[K] = T[K], R extends T[K] | Promise<T[K]> = T[K]>(key: K, setter?: (value: P) => R): UpdateComposerBuilder<T, S & SettersMap<string & K, P, R>>;
    build<R extends any | Promise<any>>(onUpdate: (changes: Partial<T>) => R): UpdateComposer<S, R>;
}
