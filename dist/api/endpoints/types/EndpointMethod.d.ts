/**
 * Http method of endpoint
 */
export declare enum EndpointMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT"
}
/**
 * Union of endpoint methods that support body
 */
export declare type EndpointMethodWithBody = EndpointMethod.POST | EndpointMethod.PUT;
/**
 * Union of all endpoint methods
 */
export declare type AnyEndpointMethod = EndpointMethod.GET | EndpointMethod.POST | EndpointMethod.PUT;
