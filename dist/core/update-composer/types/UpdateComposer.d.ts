import { SettersMap } from './SettersMap';
export declare type UpdateComposer<S extends SettersMap<string, any, any>, R> = {
    [K in keyof S as `set${Capitalize<string & Exclude<K, ''>>}`]: (value: Parameters<S[K]>[0]) => ReturnType<S[K]>;
} & {
    set<K extends Exclude<keyof S, ''>>(key: K, value: Parameters<S[K]>[0]): ReturnType<S[K]>;
    update(): R;
};
