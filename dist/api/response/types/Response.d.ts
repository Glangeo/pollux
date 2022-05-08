import { ResponseStatus } from './ResponseStatus';
/**
 * API response payload
 */
export declare type Response<S = unknown, E = unknown> = SuccessResponse<S> | ErrorResponse<E>;
/**
 * Success API response payload
 */
export declare type SuccessResponse<T = unknown> = {
    readonly status: ResponseStatus.Success;
    readonly data: T;
};
/**
 * Error API response payload
 */
export declare type ErrorResponse<T = unknown> = {
    readonly status: ResponseStatus.Error;
    readonly error: {
        readonly context: string;
        readonly meta: T;
    };
};
