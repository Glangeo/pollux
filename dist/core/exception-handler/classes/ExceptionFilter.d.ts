import { IExceptionFilter } from '../interfaces';
import { ExceptionFilterPredicate } from '../types';
export declare class ExceptionFilter implements IExceptionFilter {
    readonly predicate: ExceptionFilterPredicate;
    constructor(predicate: ExceptionFilterPredicate);
}
