import { Exception } from 'src/core/exception';

export interface IExceptionFilter {
  predicate(exception: Exception): boolean;
}
