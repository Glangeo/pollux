import { Exception } from 'src/exception';
export declare function throwsException<T extends new (...params: any) => Exception>(func: () => Promise<any>, constructor: T): Promise<boolean>;
