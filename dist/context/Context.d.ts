export interface IContextState {
    route: string;
    params: Record<string, unknown>;
    queryParams: Record<string, unknown>;
    extendableState: any;
}
export declare class Context {
    readonly state: IContextState;
    private readonly defaultState;
    constructor(initialState: IContextState);
}
