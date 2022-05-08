import { HTTPStatusCode } from 'src/api/common';
import { Exception, ExceptionConstructionProperties } from '../Exception';
import { ExceptionType } from './ExceptionType';

export type NotFoundExceptionPrivateMeta = {
  readonly collection: string;
  readonly query: string;
};

export class NotFoundException extends Exception<
  NotFoundExceptionPrivateMeta,
  any
> {
  public constructor(
    properties: Omit<
      ExceptionConstructionProperties<NotFoundExceptionPrivateMeta, any>,
      'type'
    >
  ) {
    super({
      ...properties,
      type: ExceptionType.Domain,
      httpStatusCode: HTTPStatusCode.NotFound,
    });
  }
}
