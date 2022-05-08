import { Exception } from '../../exception';
import { IExceptionFilter, IExceptionPipe } from '../interfaces';
import { ExceptionPipeConsumer } from '../types';
export declare class ExceptionPipe implements IExceptionPipe {
    readonly consumer: ExceptionPipeConsumer;
    private readonly filters;
    constructor(consumer: ExceptionPipeConsumer);
    addFilter(filter: IExceptionFilter): this;
    execute(exception: Exception): void | Promise<void>;
}
