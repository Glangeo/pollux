import { SetterConfiguration } from './SetterConfiguration';
export declare type DefineSettersMap<T, S extends SetterConfiguration<T>> = {
    [K in string & keyof T & keyof S]: (value: T[K]) => S[K] extends 'sync' ? T[K] : Promise<T[K]>;
};
