import { Exception } from 'src/core/exception';

export type ExceptionFilterPredicate = (exception: Exception) => boolean;
