import { Exception } from '../Exception';
import { ExceptionType } from '../ExceptionType';

export class InternalException extends Exception {
  public type: ExceptionType = 'internal';
}
