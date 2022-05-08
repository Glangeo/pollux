import { ErrorResponse } from '../types';
/**
 * Helper for easy creation ErrorResponse object
 *
 * @param context message describing context of occured error
 * @param meta meta information abount an error
 * @returns ErrorResponse
 */
export declare function createErrorResponse<T = unknown>(context: string, meta: T): ErrorResponse<T>;
