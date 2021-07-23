import { IRoute } from './IRoute';

export function combineRoutes(
  routes: IRoute<any, any, any>[],
  options: {
    pathPrefix?: string;
  } = {}
): IRoute<any, any, any>[] {
  const { pathPrefix } = options;

  return routes.map((route) => ({
    ...route,
    path: pathPrefix ? concatinatePathes([pathPrefix, route.path]) : route.path,
  }));
}

function concatinatePathes(pathes: string[]): string {
  const path = pathes
    .join('/')
    .replace(/\/\/+/g, '/')
    .replace(/\/$/, '')
    .replace(/^\/*/, '/');

  return path;
}
