import { Exception } from 'src/core/exception';
import { IExceptionFilter, IExceptionPipe } from '../interfaces';
import { ExceptionPipeConsumer } from '../types';

export class ExceptionPipe implements IExceptionPipe {
  private readonly filters: IExceptionFilter[];

  public constructor(public readonly consumer: ExceptionPipeConsumer) {
    this.filters = [];
  }

  public addFilter(filter: IExceptionFilter): this {
    this.filters.push(filter);

    return this;
  }

  public execute(exception: Exception): void | Promise<void> {
    const isFit = this.filters.every((filter) => filter.predicate(exception));

    if (isFit) {
      const result = this.consumer(exception);

      if (result instanceof Promise) {
        return result;
      }
    }
  }
}
