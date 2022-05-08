import { Exception } from '../../exception';
import { IExceptionFilter } from './IExceptionFilter';
export interface IExceptionPipe {
    addFilter(filter: IExceptionFilter): this;
    execute(exception: Exception): void | Promise<void>;
}
