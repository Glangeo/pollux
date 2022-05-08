import { ContextEnhancer } from '../types/ContextEnhancer';

/**
 * Helper for creating context enhancer
 *
 * @returns Typed ContextEnhancer
 */
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
