import { Exception } from 'src/core/exception';
import { IExceptionPipe } from './IExceptionPipe';

export type ExceptionHandlerErrorType = 'all' | string;

export interface IExceptionHandler {
  on(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void;

  unbind(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void;

  handle(exception: Exception): void | Promise<void>;
}
