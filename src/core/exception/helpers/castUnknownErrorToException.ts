import { HTTPStatusCode } from 'src/api/response/types';
import { Exception } from '../Exception';
import { ExceptionType } from '../prebuild';

export function castUnknownErrorToException(error: any): Exception {
  if (error instanceof Exception) {
    return error;
  }

  if (error instanceof Error) {
    return new Exception({
      type: ExceptionType.Runtime,
      message: error.message,
      httpStatusCode: HTTPStatusCode.InternalServerError,
    });
  }

  return new Exception({
    type: ExceptionType.Runtime,
    message: error.toString(),
    httpStatusCode: HTTPStatusCode.InternalServerError,
  });
}
