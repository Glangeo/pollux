import { Omit } from 'lodash';
import { IContextState } from '../context';
import { ExceptionType } from './ExceptionType';
export interface IExceptionMeta {
    contextState?: Omit<IContextState, 'extendableState'>;
}
export interface IPublicMeta {
    key: string;
    details: string[];
}
export declare abstract class Exception<T = ExceptionType, U extends IExceptionMeta = IExceptionMeta> {
    readonly action: string;
    readonly details: string[];
    readonly publicMeta?: IPublicMeta | undefined;
    readonly meta?: U | undefined;
    abstract type: T;
    constructor(action: string, details: string[], publicMeta?: IPublicMeta | undefined, meta?: U | undefined);
    toPlainObject(): Record<string, unknown>;
    getPublicPlainData(): Record<string, unknown>;
}
