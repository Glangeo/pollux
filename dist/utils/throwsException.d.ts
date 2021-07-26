import { Exception } from '../exception';
export declare function throwsException<T extends new (...params: any) => Exception>(func: () => Promise<any>, constructor: T): Promise<boolean>;
