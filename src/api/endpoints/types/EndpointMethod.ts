export enum EndpointMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export type EndpointMethodWithBody = EndpointMethod.POST | EndpointMethod.PUT;

export type AnyEndpointMethod =
  | EndpointMethod.GET
  | EndpointMethod.POST
  | EndpointMethod.PUT;
