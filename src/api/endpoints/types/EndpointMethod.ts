/**
 * Http method of endpoint
 */
export enum EndpointMethod {
  HEAD = 'HEAD',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Union of endpoint methods that support body
 */
export type EndpointMethodWithBody =
  | EndpointMethod.POST
  | EndpointMethod.PUT
  | EndpointMethod.PATCH
  | EndpointMethod.DELETE;

/**
 * Union of all endpoint methods
 */
export type AnyEndpointMethod =
  | EndpointMethod.HEAD
  | EndpointMethod.GET
  | EndpointMethod.POST
  | EndpointMethod.PUT
  | EndpointMethod.PATCH
  | EndpointMethod.DELETE;
