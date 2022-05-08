import { ContextState } from './types';
/**
 * Context is used to transfer data from middlewares and router to endpoint handler
 */
export declare class Context {
    readonly state: ContextState;
    private readonly defaultState;
    constructor(initialState: ContextState);
}
