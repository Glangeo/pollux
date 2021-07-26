import { Exception } from 'src/exception';
import { NotFoundException } from 'src/exception/common/NotFountException';
export declare function isNotFoundException(exception: Exception): exception is NotFoundException;
