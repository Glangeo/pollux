import { ResponseStatus, SuccessResponse } from '../types';

/**
 * Helper for easy creation SuccessResponse object
 *
 * @param data response data
 * @returns SuccessResponse
 */
export function createSuccessResponse<T = unknown>(
  data: T
): SuccessResponse<T> {
  return {
    status: ResponseStatus.Success,
    data,
  };
}
