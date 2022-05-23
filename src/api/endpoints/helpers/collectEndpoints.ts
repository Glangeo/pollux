/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';
import pth from 'path';
import { fixUrl } from 'src/local-utils';
import { AnyEndpoint } from '../types/Endpoint';

type EndpointConfiguration = {
  readonly path: string[];
  readonly endpoint: AnyEndpoint;
};

/**
 * Collects endpoints from their files inside specified folder
 *
 * @param dirname path to folder where endpoints are stored
 * @returns array of collected from folder endpoints
 */
export function collectEndpoints(dirname: string): AnyEndpoint[] {
  const endpointsFolderPath = pth.resolve(dirname, 'endpoints');
  const paths = fs.readdirSync(endpointsFolderPath);

  const configurations = configureEndpointsByPaths(
    endpointsFolderPath,
    paths,
    []
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
  components: string[]
): EndpointConfiguration[] {
  const configurations: EndpointConfiguration[] = [];

  for (const path of relativePaths) {
    const absolutePath = pth.resolve(absoluteBasePath, path);
    const isFile = fs.lstatSync(absolutePath).isFile();

    if (isFile) {
      const module = require(absolutePath);

      if (module.default) {
        const route = castFolderOrFileNameToRoute(path);

        const configuration: EndpointConfiguration = {
          path: [...components, route],
          endpoint: module.default,
        };

        configurations.push(configuration);
      } else {
        throw new Error('Endpoint file must have a default export');
      }
    } else {
      const route = castFolderOrFileNameToRoute(path);

      configurations.push(
        ...configureEndpointsByPaths(
          pth.resolve(absoluteBasePath, path),
          fs.readdirSync(absolutePath),
          [...components, route]
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

  let indexInA: number = getIndexOfFirstDynamicComponent(a.path);
  let indexInB: number = getIndexOfFirstDynamicComponent(b.path);

  while (indexInA === indexInB && indexInA !== -1 && indexInB !== -1) {
    indexInA = getIndexOfFirstDynamicComponent(a.path.slice(indexInA + 1));
    indexInB = getIndexOfFirstDynamicComponent(b.path.slice(indexInB + 1));
  }

  if (indexInA === -1 && indexInB === -1) {
    return a.path[a.path.length - 1].length - b.path[b.path.length - 1].length;
  }

  return indexInA - indexInB;
}
