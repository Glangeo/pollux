import { Exception } from '../exception/Exception';
import {
  ExceptionHandlerErrorType,
  IExceptionHandler,
  IExceptionPipe,
} from './interfaces';

export class ExceptionHandler implements IExceptionHandler {
  private readonly pipeMap: Map<ExceptionHandlerErrorType, IExceptionPipe[]>;

  public constructor() {
    this.pipeMap = new Map();
  }

  public on(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void {
    const pipes = this.pipeMap.get(type) || [];

    if (pipes.includes(pipe)) {
      return;
    }

    pipes.push(pipe);

    this.pipeMap.set(type, pipes);
  }

  public unbind(type: ExceptionHandlerErrorType, pipe: IExceptionPipe): void {
    const pipes = this.pipeMap.get(type) || [];
    const index = pipes.findIndex((p) => p === pipe);

    if (index !== -1) {
      pipes.splice(index, 1);

      this.pipeMap.set(type, pipes);
    }
  }

  public async handle(exception: Exception): Promise<void> {
    const typedPipes = this.pipeMap.get(exception.type) || [];
    const allPipes = this.pipeMap.get('all') || [];

    await this.pipeException(exception, typedPipes);
    await this.pipeException(exception, allPipes);
  }

  private async pipeException(
    exception: Exception,
    pipes: IExceptionPipe[]
  ): Promise<void> {
    for (const pipe of pipes) {
      await pipe.execute(exception);
    }
  }
}
