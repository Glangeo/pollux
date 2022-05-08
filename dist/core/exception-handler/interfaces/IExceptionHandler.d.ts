import { Exception } from '../../exception';
import { IExceptionPipe } from './IExceptionPipe';
export declare type ExceptionHandlerErrorType = 'all' | string;
export interface IExceptionHandler {
    on(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void;
    unbind(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void;
    handle(exception: Exception): void | Promise<void>;
}
