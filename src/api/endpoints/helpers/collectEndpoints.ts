/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';
import pth from 'path';
import { AnyEndpoint } from '../types/Endpoint';

type EndpointConfiguration = {
  path: string[];
  endpoint: AnyEndpoint;
};

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
        const configuration: EndpointConfiguration = {
          path: [...components, path.replace(/\.ts/g, '')],
          endpoint: module.default,
        };

        configurations.push(configuration);
      } else {
        throw new Error('Endpoint file must have a default export');
      }
    } else {
      configurations.push(
        ...configureEndpointsByPaths(
          pth.resolve(absoluteBasePath, path),
          fs.readdirSync(absolutePath),
          [...components, path]
        )
      );
    }
  }

  return configurations;
}
