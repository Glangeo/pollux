import * as Yup from 'yup';
import { AnyEndpoint, createEndpoint, EndpointMethod, Router } from 'src/api';
import { createModule, InternalException, Module } from 'src/core';
import { DevelopmentLogger, DevLogEvent } from 'src/local-utils';
import { ServiceRegistry } from '../classes';
import { ServiceConstructor } from '../types';
import { getRequestReceiver } from './getRequestReceiver';

export function createRemoteCallModule(services: ServiceConstructor[]): Module {
  const receivers = services.map((constructor) =>
    getRequestReceiver(ServiceRegistry.getService(constructor))
  );

  const call = createEndpoint({
    route: '/call',
    method: EndpointMethod.POST,
    validation: {
      query: undefined,
      params: undefined,
      body: Yup.object({
        service: Yup.string()
          .equals(services.map(({ name }) => name))
          .required(),
        method: Yup.string().required(),
        params: Yup.array().required(),
      }),
    },

    action: async ({ body }, req) => {
      const { service: serviceName, method, params } = body;

      const receiver = receivers.find(({ service }) => service === serviceName);

      if (!receiver) {
        throw new InternalException({
          message: 'Could not find reciever for requested service.',
          meta: {
            description: [
              `Service: ${serviceName}`,
              `Method: ${method}`,
              `Available services: ${services
                .map(({ name }) => name)
                .join(', ')}`,
            ],
          },
        });
      }

      DevelopmentLogger.LOG(
        DevLogEvent.DistributedRemoteCallReceived,
        `from ${req.originalUrl} to call ${serviceName}.${method}`
      );

      return receiver.call(method as any, params);
    },
  });

  return createModule({
    name: 'RemoteCallReciever',
    router: new Router({
      path: '/detached',
      endpoints: [call as AnyEndpoint],
    }),
  });
}
