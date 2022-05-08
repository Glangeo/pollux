import { Exception } from '../../exception';
export declare type ExceptionPipeConsumer = (exception: Exception) => void | Promise<void>;
