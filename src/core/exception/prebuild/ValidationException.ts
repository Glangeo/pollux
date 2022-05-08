import { HTTPStatusCode } from 'src/api/common';
import { Exception, ExceptionConstructionProperties } from '../Exception';
import { ExceptionType } from './ExceptionType';

export type ValidationExceptionPrivateMeta = {
  readonly errors: string[];
};

export class ValidationException extends Exception<
  ValidationExceptionPrivateMeta,
  any
> {
  public constructor(
    properties: Omit<
      ExceptionConstructionProperties<ValidationExceptionPrivateMeta, any>,
      'type'
    >
  ) {
    super({
      ...properties,
      type: ExceptionType.Validation,
      httpStatusCode: HTTPStatusCode.BadRequest,
    });
  }
}
