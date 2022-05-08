import { CoreTypes } from '../../types';
export declare type ExceptionProperties<T extends CoreTypes.PlainTypes.Object, U extends CoreTypes.PlainTypes.Object> = {
    readonly stack: string;
    readonly type: string;
    readonly message: string;
    readonly httpStatusCode?: number;
    readonly meta?: T;
    readonly publicInfo?: {
        readonly message: string;
        readonly meta?: U;
    };
};
