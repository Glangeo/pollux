import { HTTPStatusCode } from 'src/api/response/types';
import { Exception, ExceptionConstructionProperties } from '../Exception';
import { ExceptionType } from './ExceptionType';

export type NotFoundExceptionPrivateMeta = {
  readonly entity: string;
  readonly query: string;
};

export class NotFoundException extends Exception<NotFoundExceptionPrivateMeta> {
  public constructor(
    properties: Omit<
      ExceptionConstructionProperties<NotFoundExceptionPrivateMeta>,
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
