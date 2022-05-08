import { HTTPStatusCode } from 'src/api/common';
import { Exception, ExceptionConstructionProperties } from '../Exception';
import { ExceptionType } from './ExceptionType';

export type InternalExceptionPrivateMeta = {
  readonly description: string[];
};

export class InternalException extends Exception<
  InternalExceptionPrivateMeta,
  any
> {
  public constructor(
    properties: Omit<
      ExceptionConstructionProperties<InternalExceptionPrivateMeta, any>,
      'type'
    >
  ) {
    super({
      ...properties,
      type: ExceptionType.Runtime,
      httpStatusCode: HTTPStatusCode.InternalServerError,
    });
  }
}
