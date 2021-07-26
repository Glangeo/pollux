import { NotFoundException } from '../exception/common/NotFountException';
import { Exception } from '../exception';
export declare function isNotFoundException(exception: Exception): exception is NotFoundException;
