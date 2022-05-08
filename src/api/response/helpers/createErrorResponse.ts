import { ErrorResponse, ResponseStatus } from '../types';

/**
 * Helper for easy creation ErrorResponse object
 *
 * @param context message describing context of occured error
 * @param meta meta information abount an error
 * @returns ErrorResponse
 */
export function createErrorResponse<T = unknown>(
  context: string,
  meta: T
): ErrorResponse<T> {
  return {
    status: ResponseStatus.Error,
    error: {
      context,
      meta,
    },
  };
}
