import { InternalException } from 'src/core';
import { RequestEmitter, ServiceConstructor, Contract } from '../types';

type RequestHandler = (request: Contract.Request) => Promise<Contract.Response>;

export function getRequestEmitter<T extends ServiceConstructor>(
  constructor: T,
  onRequest: RequestHandler
): RequestEmitter<InstanceType<T>> {
  const emitter: RequestEmitter<T> = {} as any;

  // Collect methods from prototype
  addMethodsFromObject(
    emitter,
    constructor.prototype,
    onRequest,
    constructor.name
  );
  // Collect methods from instance
  addMethodsFromObject(emitter, new constructor(), onRequest, constructor.name);

  return emitter as any;
}

function addMethodsFromObject(
  emitter: any,
  obj: any,
  onRequest: RequestHandler,
  className: string
): void {
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    const isMethod = key !== 'constructor' && typeof obj[key] === 'function';

    if (isMethod) {
      emitter[key as any] = async function (...args: any[]) {
        try {
          JSON.stringify(args);
        } catch (error) {
          throw new InternalException({
            message:
              'Could not make distributed call: args contain circular structure',
            meta: {
              description: [`Class: ${className}`, `Method: ${key}`],
            },
          });
        }

        const request: Contract.Request = {
          args,
          method: key,
          service: className,
        };
        const response = await onRequest(request);

        return response.result;
      };
    }
  }
}
