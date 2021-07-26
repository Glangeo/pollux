import { Exception } from '../Exception';
import { ExceptionType } from '../ExceptionType';
export declare class DBException extends Exception {
    type: ExceptionType;
}
