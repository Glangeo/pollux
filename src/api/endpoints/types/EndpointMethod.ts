/**
 * Http method of endpoint
 */
export enum EndpointMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

/**
 * Union of endpoint methods that support body
 */
export type EndpointMethodWithBody = EndpointMethod.POST | EndpointMethod.PUT;

/**
 * Union of all endpoint methods
 */
export type AnyEndpointMethod =
  | EndpointMethod.GET
  | EndpointMethod.POST
  | EndpointMethod.PUT;
