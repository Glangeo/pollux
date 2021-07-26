import { Exception, IExceptionMeta } from '../Exception';
import { ExceptionType } from '../ExceptionType';
export interface IValidationExceptionMeta extends IExceptionMeta {
    form: Record<string, unknown>;
}
export declare class ValidationException extends Exception<ExceptionType, IValidationExceptionMeta> {
    type: ExceptionType;
}
