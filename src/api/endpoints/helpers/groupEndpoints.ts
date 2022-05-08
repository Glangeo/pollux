import { DevelopmentLogger } from 'src/local-utils';
import { AnyEndpoint } from '../types';

/**
 * Groups given array of endpoints into a group. Commonly used for grouping endpoints with same route prefix
 *
 * @param endpoints array of endpoints to group
 * @param options grouping options
 * @returns
 */
export function groupEndpoints(
  endpoints: AnyEndpoint[],
  options: {
    /**
     * Route prefix for each endpoint in group
     */
    routePrefix?: string;
  } = {}
): AnyEndpoint[] {
  const { routePrefix } = options;

  if (routePrefix) {
    return endpoints
      .map((endpoint) => {
        if (endpoint.route) {
          return {
            ...endpoint,
            route: concatinatePaths([routePrefix, endpoint.route]),
          };
        }

        const stack = new Error().stack;

        DevelopmentLogger.WARN(
          `groupEndpoints: endpoint skipped cause of lack of route property.${
            stack ? `\n${stack}` : ''
          }`
        );

        return null;
      })
      .filter(Boolean) as AnyEndpoint[];
  }

  return endpoints;
}

function concatinatePaths(pathes: string[]): string {
  const path = pathes
    .join('/')
    .replace(/\/\/+/g, '/')
    .replace(/\/$/, '')
    .replace(/^\/*/, '/');

  return path;
}
