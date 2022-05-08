import { Exception } from '../core/exception';
/**
 * Checks func throws an exception of specified class
 *
 * @param func function that is expected to throw
 * @param constructor exception
 * @returns true if throwed exception is instance of given constructor
 */
export declare function throwsException<T extends new (...params: any) => Exception>(func: () => any | Promise<any>, constructor: T): Promise<boolean>;
