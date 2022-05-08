import { ContextState } from './types';

/**
 * Context is used to transfer data from middlewares and router to endpoint handler
 */
export class Context {
  public readonly state: ContextState;
  private readonly defaultState: Partial<ContextState> = {};

  public constructor(initialState: ContextState) {
    this.state = Object.assign({}, this.defaultState, initialState);
  }
}
