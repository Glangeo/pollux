/**
 * Http method of endpoint
 */
export declare enum EndpointMethod {
    HEAD = "HEAD",
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
/**
 * Union of endpoint methods that support body
 */
export declare type EndpointMethodWithBody = EndpointMethod.POST | EndpointMethod.PUT | EndpointMethod.PATCH | EndpointMethod.DELETE;
/**
 * Union of all endpoint methods
 */
export declare type AnyEndpointMethod = EndpointMethod.HEAD | EndpointMethod.GET | EndpointMethod.POST | EndpointMethod.PUT | EndpointMethod.PATCH | EndpointMethod.DELETE;
