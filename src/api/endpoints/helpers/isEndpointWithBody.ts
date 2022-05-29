import { ValidationSchema } from 'src/api/validator';
import { Endpoint } from '../types/Endpoint';
import {
  EndpointMethod,
  EndpointMethodWithBody,
} from '../types/EndpointMethod';

/**
 * Checks if given endpoint might accept a body request data
 *
 * @param endpoint an endpoint to check
 * @returns
 */
export function isEndpointWithBody<
  Q extends ValidationSchema | undefined,
  P extends ValidationSchema | undefined,
  B extends ValidationSchema | undefined
>(
  endpoint: Endpoint<any, Q, P, B>
): endpoint is Endpoint<EndpointMethodWithBody, Q, P, B> {
  const methodsWithBody = [
    EndpointMethod.POST,
    EndpointMethod.PUT,
    EndpointMethod.PATCH,
    EndpointMethod.DELETE,
  ];

  return methodsWithBody.includes(endpoint.method);
}
