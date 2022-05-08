import { AnyEndpoint } from '../types';
/**
 * Groups given array of endpoints into a group. Commonly used for grouping endpoints with same route prefix
 *
 * @param endpoints array of endpoints to group
 * @param options grouping options
 * @returns
 */
export declare function groupEndpoints(endpoints: AnyEndpoint[], options?: {
    /**
     * Route prefix for each endpoint in group
     */
    routePrefix?: string;
}): AnyEndpoint[];
