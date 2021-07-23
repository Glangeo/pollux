import { Exception } from 'src/exception';
import { NotFoundException } from 'src/exception/common/NotFountException';

export function isNotFoundException(
  exception: Exception
): exception is NotFoundException {
  return exception instanceof NotFoundException;
}
