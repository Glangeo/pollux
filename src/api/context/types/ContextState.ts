/**
 * State of context. All parameters except 'extendableState' are filled automaticly. 'extendableState' is used for context enhancment
 */
export type ContextState = {
  route: string;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
  body: Record<string, unknown>;
  extendableState: any;
};
