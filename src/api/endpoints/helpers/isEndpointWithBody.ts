import { ValidationSchema } from 'src/api/validator';
import { Endpoint } from '../types/Endpoint';
import {
  EndpointMethod,
  EndpointMethodWithBody,
} from '../types/EndpointMethod';

export function isEndpointWithBody<
  Q extends ValidationSchema | undefined,
  P extends ValidationSchema | undefined,
  B extends ValidationSchema | undefined
>(
  endpoint: Endpoint<any, Q, P, B>
): endpoint is Endpoint<EndpointMethodWithBody, Q, P, B> {
  const methodsWithBody = [EndpointMethod.POST, EndpointMethod.PUT];

  return methodsWithBody.includes(endpoint.method);
}
