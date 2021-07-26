import { Context } from './Context';
export declare type ContextEnhancer<S> = {
    setState(state: S, context: Context): void;
    getState(context: Context): S;
};
export declare function createContextEnhancer<S>(): ContextEnhancer<S>;
