import { ValidationSchema } from '../../validator';
import { Endpoint, EndpointMethod } from '../types';
/**
 * Autodetect types when creating an endpoint
 *
 * @param endpoint endpoint configuration
 * @returns
 */
export declare function createEndpoint<M extends EndpointMethod, Q extends ValidationSchema | undefined, P extends ValidationSchema | undefined, B extends ValidationSchema | undefined>(endpoint: Endpoint<M, Q, P, B>): Endpoint<M, Q, P, B>;
