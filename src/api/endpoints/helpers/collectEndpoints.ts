/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';
import pth from 'path';
import { fixUrl } from 'src/local-utils';
import { EndpointMethod } from '../types';
import { AnyEndpoint } from '../types/Endpoint';

type EndpointConfiguration = {
  readonly path: string[];
  readonly endpoint: AnyEndpoint;
};

/**
 * Collects endpoints from their files inside specified folder
 *
 * @param dirname path to folder where endpoints folder is placed
 * @param [folderName] folder name where endpoints are places
 * @returns array of collected from folder endpoints
 */
export function collectEndpoints(
  dirname: string,
  folderName = 'endpoints',
  endpointRegExp = /.*\.ts$/g
): AnyEndpoint[] {
  const endpointsFolderPath = pth.resolve(dirname, folderName);
  const paths = fs.readdirSync(endpointsFolderPath);

  const configurations = configureEndpointsByPaths(
    endpointsFolderPath,
    paths,
    [],
    endpointRegExp
  );

  const endpoints: AnyEndpoint[] = configurations
    .sort(confiurationsComparator)
    .map((configuration) => ({
      ...configuration.endpoint,
      route: fixUrl(configuration.path.join('/')),
    }));

  return endpoints;
}

function configureEndpointsByPaths(
  absoluteBasePath: string,
  relativePaths: string[],
  components: string[],
  endpointRegExp: RegExp
): EndpointConfiguration[] {
  const configurations: EndpointConfiguration[] = [];

  for (const path of relativePaths) {
    const absolutePath = pth.resolve(absoluteBasePath, path);
    const isFile = fs.lstatSync(absolutePath).isFile();

    if (isFile) {
      const isEndpoint = Boolean(absolutePath.match(endpointRegExp));

      if (isEndpoint) {
        const module = require(absolutePath);

        if (module.default) {
          const route = castFolderOrFileNameToRoute(path);

          const endpoints = Array.isArray(module.default)
            ? module.default
            : [module.default];

          checkIfEndpointsOfSameRouteHasDifferentMethods(endpoints, path);

          for (const endpoint of endpoints) {
            const configuration: EndpointConfiguration = {
              endpoint,
              path: [...components, route],
            };

            configurations.push(configuration);
          }
        }
      } else {
        throw new Error(
          `Endpoint file must have a default export. Endpoint file path: ${absolutePath}`
        );
      }
    } else {
      const route = castFolderOrFileNameToRoute(path);

      configurations.push(
        ...configureEndpointsByPaths(
          pth.resolve(absoluteBasePath, path),
          fs.readdirSync(absolutePath),
          [...components, route],
          endpointRegExp
        )
      );
    }
  }

  return configurations;
}

function castFolderOrFileNameToRoute(name: string): string {
  if (name === 'index.ts') {
    return '/';
  }

  if (name.includes('[')) {
    const fromIndex = name.indexOf('[');
    const toIndex = name.indexOf(']');

    const param = name.substring(fromIndex + 1, toIndex);

    return `:${param}`;
  }

  return name.replace(/\.ts/g, '');
}

function confiurationsComparator(
  a: EndpointConfiguration,
  b: EndpointConfiguration
): number {
  if (a.path.length !== b.path.length) {
    return a.path.length - b.path.length;
  }

  const getIndexOfFirstDynamicComponent = (path: string[]): number =>
    path.findIndex((component) => component.includes(':'));

  const pathA = [...a.path];
  const pathB = [...b.path];
  let indexInA: number = getIndexOfFirstDynamicComponent(pathA);
  let indexInB: number = getIndexOfFirstDynamicComponent(pathB);

  while (indexInA === indexInB) {
    if (indexInA === -1 && indexInB === -1) {
      return (
        // TODO: fix order
        a.path[a.path.length - 1].length - b.path[b.path.length - 1].length
      );
    }

    pathA.splice(0, indexInA + 1);
    pathB.splice(0, indexInB + 1);
    indexInA = getIndexOfFirstDynamicComponent(pathA);
    indexInB = getIndexOfFirstDynamicComponent(pathB);
  }

  return indexInA - indexInB;
}

function checkIfEndpointsOfSameRouteHasDifferentMethods(
  endpoints: AnyEndpoint[],
  path: string
) {
  const set: Set<EndpointMethod> = new Set();

  endpoints.forEach((endpoint: any) => {
    if (set.has(endpoint.method)) {
      throw new Error(
        `Could not add multiple endpoints with same method and route.\nPath: ${path}`
      );
    }

    set.add(endpoint.method);
  });
}
