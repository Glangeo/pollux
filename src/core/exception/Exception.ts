/* eslint-disable @typescript-eslint/ban-types */
import { CoreTypes } from 'src/core/types';
import { ExceptionProperties } from './types/ExceptionProperties';

type Meta = CoreTypes.PlainTypes.Object;

export type ExceptionConstructionProperties<
  T extends Meta = {},
  U extends Meta = {}
> = Omit<ExceptionProperties<T, U>, 'stack'> & { stack?: string };

export class Exception<T extends Meta = {}, U extends Meta = {}>
  implements ExceptionProperties<T, U>
{
  public readonly stack: string;
  public readonly type: string;
  public readonly message: string;
  public readonly httpStatusCode?: number;
  public readonly meta?: T;
  public readonly publicInfo?: {
    readonly message: string;
    readonly meta?: U;
  };

  public constructor(params: ExceptionConstructionProperties<T, U>) {
    const { type, message, meta, publicInfo, httpStatusCode, stack } = params;

    this.type = type;
    this.message = message;
    this.meta = meta;
    this.publicInfo = publicInfo;
    this.httpStatusCode = httpStatusCode;
    this.stack = stack || '';

    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toString(): string {
    return `${this.constructor.name}: ${this.message}`;
  }

  public getFullProjection() {
    return {
      name: this.constructor.name,
      type: this.type,
      message: this.message,
      httpStatusCode: this.httpStatusCode,
      meta: this.meta,
      publicInfo: this.publicInfo,
      stack: this.stack,
    };
  }

  public getPublicProjection() {
    return {
      name: this.constructor.name,
      type: this.type,
      message: this.publicInfo?.message,
      httpStatusCode: this.httpStatusCode,
      meta: this.publicInfo?.meta,
    };
  }
}
