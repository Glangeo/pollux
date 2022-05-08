/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';
import pth from 'path';
import { fixRoutePath } from 'src/api/router/helpers';
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

  const endpoints: AnyEndpoint[] = configurations.map((configuration) => ({
    ...configuration.endpoint,
    route: configuration.path.join('/'),
  }));

  return endpoints.map(({ route, ...rest }) => ({
    ...rest,
    route: fixRoutePath(route || ''),
  }));
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
