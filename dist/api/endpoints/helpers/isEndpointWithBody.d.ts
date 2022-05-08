import { ValidationSchema } from '../../validator';
import { Endpoint } from '../types/Endpoint';
import { EndpointMethodWithBody } from '../types/EndpointMethod';
/**
 * Checks if given endpoint might accept a body request data
 *
 * @param endpoint an endpoint to check
 * @returns
 */
export declare function isEndpointWithBody<Q extends ValidationSchema | undefined, P extends ValidationSchema | undefined, B extends ValidationSchema | undefined>(endpoint: Endpoint<any, Q, P, B>): endpoint is Endpoint<EndpointMethodWithBody, Q, P, B>;
