import { createEndpoint, EndpointMethod } from 'src/api';

export default [
  createEndpoint({
    method: EndpointMethod.GET,
    action: async () => ({}),
  }),
  createEndpoint({
    method: EndpointMethod.POST,
    action: async () => ({}),
  }),
];
