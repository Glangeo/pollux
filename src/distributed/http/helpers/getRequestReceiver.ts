import { InternalException } from 'src/core';
import { RequestReceiver, ServiceConstructor, Contract } from '../types';

export function getRequestReceiver<T extends ServiceConstructor>(
  service: InstanceType<T>
): RequestReceiver<InstanceType<T>> {
  const receiver = {
    service: service.constructor.name,

    async call(
      method: keyof InstanceType<T>,
      args: any[]
    ): Promise<Contract.Response> {
      const operation = service[method];
      const isMethod =
        method !== 'constructor' && typeof operation === 'function';

      if (!isMethod) {
        throw new InternalException({
          message: 'Could not call non-method property',
          meta: {
            description: [
              `Class: ${service.constructor.name}`,
              `Method: ${method}`,
            ],
          },
        });
      }

      const result = await operation.call(service, ...args);
      const response: Contract.Response = {
        result,
        method: method.toString(),
        service: service.constructor.name,
      };

      return response;
    },
  };

  return receiver;
}
