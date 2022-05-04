import { HTTPStatusCode } from 'src/api/response/types';
import { Exception, ExceptionConstructionProperties } from '../Exception';
import { ExceptionType } from './ExceptionType';

export type ValidationExceptionPrivateMeta = {
  readonly errors: string[];
};

export class ValidationException extends Exception<ValidationExceptionPrivateMeta> {
  public constructor(
    properties: Omit<
      ExceptionConstructionProperties<ValidationExceptionPrivateMeta>,
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
