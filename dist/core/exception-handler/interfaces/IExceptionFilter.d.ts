import { Exception } from '../../exception';
export interface IExceptionFilter {
    predicate(exception: Exception): boolean;
}
