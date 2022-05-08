import { Context } from '../Context';
/**
 * ContextEnhancer is used to enhance context state to store more data
 *
 * @param setState writes enhanced state into context
 * @param getState gets enhanced state from context
 */
export declare type ContextEnhancer<S> = {
    setState(state: S, context: Context): void;
    getState(context: Context): S;
};
