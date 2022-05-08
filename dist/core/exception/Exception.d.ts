import { CoreTypes } from '../types';
import { ExceptionProperties } from './types/ExceptionProperties';
declare type Meta = CoreTypes.PlainTypes.Object;
export declare type ExceptionConstructionProperties<T extends Meta = {}, U extends Meta = {}> = Omit<ExceptionProperties<T, U>, 'stack'>;
export declare class Exception<T extends Meta = {}, U extends Meta = {}> implements ExceptionProperties<T, U> {
    readonly stack: string;
    readonly type: string;
    readonly message: string;
    readonly httpStatusCode?: number;
    readonly meta?: T;
    readonly publicInfo?: {
        readonly message: string;
        readonly meta?: U;
    };
    constructor(params: ExceptionConstructionProperties<T, U>);
    toString(): string;
    getFullProjection(): {
        name: string;
        type: string;
        message: string;
        httpStatusCode: number | undefined;
        meta: T | undefined;
        publicInfo: {
            readonly message: string;
            readonly meta?: U | undefined;
        } | undefined;
        stack: string;
    };
    getPublicProjection(): {
        name: string;
        type: string;
        message: string | undefined;
        httpStatusCode: number | undefined;
        meta: U | undefined;
    };
}
export {};
