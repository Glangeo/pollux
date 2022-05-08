import { SuccessResponse } from '../types';
/**
 * Helper for easy creation SuccessResponse object
 *
 * @param data response data
 * @returns SuccessResponse
 */
export declare function createSuccessResponse<T = unknown>(data: T): SuccessResponse<T>;
