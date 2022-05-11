import { InternalException } from 'src/core';
import { RequestEmitter, ServiceConstructor, Contract } from '../types';

export function getRequestEmitter<T extends ServiceConstructor>(
  constructor: T,
  onRequest: (request: Contract.Request) => Promise<Contract.Response>
): RequestEmitter<T> {
  const emitter: RequestEmitter<T> = {} as any;
  const keys = Object.getOwnPropertyNames(constructor.prototype);

  for (const key of keys) {
    const isMethod =
      key !== 'constructor' && typeof constructor.prototype[key] === 'function';

    if (isMethod) {
      // TODO: add support of static methods and etc.
      (emitter as any)[key as any] = async function (...args: any[]) {
        try {
          JSON.stringify(args);
        } catch (error) {
          throw new InternalException({
            message:
              'Could not make distributed call: args contain circular structure',
            meta: {
              description: [`Class: ${constructor.name}`, `Method: ${key}`],
            },
          });
        }

        const request: Contract.Request = {
          args,
          method: key,
        };
        const response = await onRequest(request);

        return response.result;
      };
    }
  }

  return emitter as any;
}
