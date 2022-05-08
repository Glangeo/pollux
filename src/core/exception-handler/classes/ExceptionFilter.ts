import { IExceptionFilter } from '../interfaces';
import { ExceptionFilterPredicate } from '../types';

export class ExceptionFilter implements IExceptionFilter {
  public constructor(public readonly predicate: ExceptionFilterPredicate) {}
}
