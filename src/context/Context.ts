export interface IContextState {
  route: string;
  params: Record<string, unknown>;
  queryParams: Record<string, unknown>;
  extendableState: any;
}

export class Context {
  public readonly state: IContextState;
  private readonly defaultState: Partial<IContextState> = {};

  public constructor(initialState: IContextState) {
    this.state = Object.assign({}, this.defaultState, initialState || {});
  }
}
