import { ValidationSchema } from 'src/api/validator';
import { Endpoint, EndpointMethod } from '../types';

export function createEndpoint<
  M extends EndpointMethod,
  Q extends ValidationSchema | undefined,
  P extends ValidationSchema | undefined,
  B extends ValidationSchema | undefined
>(endpoint: Endpoint<M, Q, P, B>): Endpoint<M, Q, P, B> {
  return endpoint;
}
