import { ResponseStatus } from './ResponseStatus';

/**
 * API response payload
 */
export type Response<S = unknown, E = unknown> =
  | SuccessResponse<S>
  | ErrorResponse<E>;

/**
 * Success API response payload
 */
export type SuccessResponse<T = unknown> = {
  readonly status: ResponseStatus.Success;
  readonly data: T;
};

/**
 * Error API response payload
 */
export type ErrorResponse<T = unknown> = {
  readonly status: ResponseStatus.Error;
  readonly error: {
    readonly context: string;
    readonly meta: T;
  };
};
