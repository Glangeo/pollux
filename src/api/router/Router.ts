import express from 'express';
import { DevelopmentLogger, DevLogEvent } from 'src/utils';
import { Optional } from 'utility-types';
import { AnyEndpoint, EndpointMethod, isEndpointWithBody } from '../endpoints';
import { validate, ValidationSchema, Validator } from '../validator';
import { fixRoutePath } from './helpers/fixRoutePath';

/**
 * Router configuration
 */
export type RouterConfiguration = {
  /**
   * Array of endpoints to be addded
   */
  readonly endpoints: AnyEndpoint[];
  /**
   * Base path for all nested endpoints
   */
  readonly path: string;
  /**
   * Validator that is used to validate request data
   */
  readonly validator: Validator;
};

/**
 * Adds each endpoint to express.Router, adds validations mechanism and wraps every request with exception handler
 */
export class Router {
  private static readonly DEFAULT_CONFIG: RouterConfiguration = {
    endpoints: [],
    path: '',
    validator: validate,
  };
  private readonly config: RouterConfiguration;

  public constructor(config: Optional<RouterConfiguration>) {
    this.config = {
      ...Router.DEFAULT_CONFIG,
      ...config,
    };
  }

  /**
   * Adds all endpoints with validations and exception handling wrapper to newly created express router
   *
   * @returns configurated express router instance
   */
  public getExpressRouter(): express.Router {
    const router = express.Router();

    for (const endpoint of this.config.endpoints) {
      if (!endpoint.route) {
        DevelopmentLogger.WARN('endpoint.route was not provided!');

        continue;
      }

      let method: express.IRouterMatcher<typeof router> | undefined = undefined;

      switch (endpoint.method) {
        case EndpointMethod.GET:
          method = router.get.bind(router);
          break;

        case EndpointMethod.POST:
          method = router.post.bind(router);
          break;

        case EndpointMethod.PUT:
          method = router.put.bind(router);
          break;

        default:
          break;
      }

      const path = fixRoutePath(`${this.config.path}/${endpoint.route}`);

      if (method) {
        method(path, this.createRequestHandler(endpoint));

        DevelopmentLogger.LOG(
          DevLogEvent.RouterRouteAdded,
          `Add route: ${endpoint.method} ${path}`
        );
      } else {
        DevelopmentLogger.WARN(
          `[WARNING] route ${endpoint.method} ${path} could not be added! Requested method is not supported. Currenlty supported methods: GET, POST, PUT`
        );
      }
    }

    return router;
  }

  private createRequestHandler(endpoint: AnyEndpoint): express.RequestHandler {
    return async (req, res) => {
      const requestData = await this.tryGetRequestData(endpoint, req);

      if (!requestData) {
        return;
      }

      // TODO: wrap into exception handler
      const result = await endpoint.action(requestData, req, res);

      if (!res.headersSent) {
        // TODO: send success response
      }
    };
  }

  private async tryGetRequestData(
    endpoint: AnyEndpoint,
    req: express.Request
  ): Promise<any | undefined> {
    const requestData: {
      query?: any;
      params?: any;
      body?: any;
    } = {};

    const partials: {
      name: 'query' | 'params' | 'body';
      schema: ValidationSchema | undefined;
    }[] = [
      {
        name: 'query',
        schema: endpoint.validation?.query,
      },
      {
        name: 'params',
        schema: endpoint.validation?.params,
      },
      {
        name: 'body',
        schema: isEndpointWithBody(endpoint)
          ? endpoint.validation?.body
          : undefined,
      },
    ];

    for (const { name, schema } of partials) {
      if (schema) {
        const validated = await this.config.validator(schema, req[name]);

        if (!validated.isValid) {
          // TODO: send error response

          return undefined;
        }

        requestData[name] = validated.data;
      }
    }

    return requestData;
  }
}
