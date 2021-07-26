import { NotFoundException } from '../exception/common/NotFountException';
import { Exception } from '../exception';

export function isNotFoundException(
  exception: Exception
): exception is NotFoundException {
  return exception instanceof NotFoundException;
}
