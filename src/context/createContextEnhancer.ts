import { Context } from './Context';

export type ContextEnhancer<S> = {
  setState(state: S, context: Context): void;

  getState(context: Context): S;
};

export function createContextEnhancer<S>(): ContextEnhancer<S> {
  return {
    setState(state, context) {
      context.state.extendableState = state;
    },

    getState(context) {
      return context.state.extendableState;
    },
  };
}
