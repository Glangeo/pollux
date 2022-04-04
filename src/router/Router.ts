import express from 'express';
import { DevelopmentLogger, DevLogEvent } from '../utils/DevelopmentLogger';
import { PublicExceptionKey } from '../exception/PublicExceptionKey';
import { Config } from '../config';
import { getContext } from '../context';
import {
  Exception,
  InternalException,
  ValidationException,
} from '../exception';
import { Middleware } from '../types/Middleware';
import { Validator } from '../validator';
import { IRoute } from './IRoute';

export interface IRouterConfig {
  basePath: string;
  routes: (IRoute<any, any, any> | (() => IRoute<any, any, any>))[];
  defaultMiddleware?: Middleware[];
}

/**
 * Request handling mechanism
 *
 * @todo Add support for different Http.Method in routes
 * @todo Move exception handling mechanism outside
 * @todo Add file-based routing system support
 */
export class Router {
  public constructor(private config: IRouterConfig) {}

  public getExpressRouter(): express.Router {
    const router = express.Router();

    for (const rawRoute of this.config.routes) {
      const route = typeof rawRoute === 'function' ? rawRoute() : rawRoute;
      const path = this.getRoutePath(route.path, route.isPrefixedByBaseRoute);
      const middleware =
        route.middleware || this.config.defaultMiddleware || [];

      router.post(path, ...middleware, Router.getRequestHandler(route));
    }

    return router;
  }

  private getRoutePath(path: string, isPrefixedByBaseRoute = true): string {
    if (isPrefixedByBaseRoute) {
      const prefixedPath = `${this.config.basePath}/${path}`
        .replace(/\/\/+/g, '/')
        .replace(/\/$/, '')
        .replace(/^\/*/, '/');

      return prefixedPath;
    }

    return path.replace(/\/$/, '').replace(/^\/*/, '/');
  }

  private static getRequestHandler(
    route: IRoute<any, any, any>
  ): express.RequestHandler {
    return (req, res) => Router.callRouteAction(req, res, route);
  }

  private static async callRouteAction(
    req: express.Request,
    res: express.Response,
    route: IRoute<any, any, any>
  ): Promise<void> {
    const context = getContext(res);
    const request = {
      route: context.state.route,
      params: context.state.params,
      query: context.state.queryParams,
      body: req.body,
    };

    try {
      const rawForm = req.body;
      const validationResult = await new Validator(
        rawForm,
        route.schema
      ).validate();

      if (validationResult.errors) {
        const { extendableState, ...rest } = context.state;

        const exception = new ValidationException(
          context.state.route,
          validationResult.errors.map((error) => error.message),
          {
            key: PublicExceptionKey.VALIDATION,
            details: [],
          },
          {
            form: req.body,
            contextState: rest,
          }
        );
        throw exception;
      }

      const form = validationResult.data;

      const result = await route.action(form, context);
      const data = route.decoration
        ? await route.decoration(result, context)
        : result;

      if (res.writableEnded) {
        return;
      }

      const response = {
        status: 'success',
        result: data,
      };

      DevelopmentLogger.LOG(
        DevLogEvent.RouterIncomingRequest,
        JSON.stringify({ request, response }, null, 2)
      );

      res.status(200).json(response);
    } catch (exception) {
      if (exception instanceof Exception) {
        const response = {
          status: 'error',
          errors:
            Config.isDev() || Config.isTest()
              ? {
                  ...exception.getPublicPlainData(),
                  ...exception.toPlainObject(),
                }
              : exception.getPublicPlainData(),
        };

        DevelopmentLogger.LOG(
          DevLogEvent.RouterIncomingRequest,
          JSON.stringify({ request, response }, null, 2)
        );

        res.status(200).json(response);
      } else {
        const { extendableState, ...rest } = context.state;

        const exceptionInstance = new InternalException(
          context.state.route,
          [String(exception)],
          {
            key: PublicExceptionKey.INTERNAL,
            details: [],
          },
          {
            contextState: rest,
          }
        );

        if (Config.isDev()) {
          // eslint-disable-next-line no-console
          console.log(exception);
        }

        const response = {
          status: 'error',
          errors:
            Config.isDev() || Config.isTest()
              ? exceptionInstance.toPlainObject()
              : exceptionInstance.getPublicPlainData(),
        };

        DevelopmentLogger.LOG(
          DevLogEvent.RouterIncomingRequest,
          JSON.stringify({ request, response }, null, 2)
        );

        res.json(response).send();
      }
    }
  }
}
