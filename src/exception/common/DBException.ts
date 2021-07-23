import { Exception } from '../Exception';
import { ExceptionType } from '../ExceptionType';

export class DBException extends Exception {
  public type: ExceptionType = 'database';
}
