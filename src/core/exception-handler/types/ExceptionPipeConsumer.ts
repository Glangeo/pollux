import { Exception } from 'src/core/exception';

export type ExceptionPipeConsumer = (
  exception: Exception
) => void | Promise<void>;
