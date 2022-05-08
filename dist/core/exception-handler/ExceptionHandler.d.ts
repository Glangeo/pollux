import { Exception } from '../exception/Exception';
import { ExceptionHandlerErrorType, IExceptionHandler, IExceptionPipe } from './interfaces';
export declare class ExceptionHandler implements IExceptionHandler {
    private readonly pipeMap;
    constructor();
    on(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void;
    unbind(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void;
    handle(exception: Exception): Promise<void>;
    private pipeException;
}
