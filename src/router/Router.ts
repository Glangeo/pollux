import express from 'express';
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

    try {
      const rawForm = req.body;
      const validationResult = await new Validator(
        rawForm,
        route.schema
      ).validate();

      if (validationResult.errors) {
        const exception = new ValidationException(
          context.state.route,
          validationResult.errors.map((error) => error.message),
          {
            key: PublicExceptionKey.VALIDATION,
            details: [],
          },
          {
            form: req.body,
            contextState: context.state,
          }
        );
        throw exception;
      }

      const form = validationResult.data;

      const result = await route.action(form, context);
      const response = route.decoration
        ? await route.decoration(result, context)
        : result;

      if (res.writableEnded) {
        return;
      }

      res.json({
        status: 'success',
        result: response,
      });
    } catch (exception) {
      if (exception instanceof Exception) {
        res
          .json({
            status: 'error',
            errors:
              Config.isDev() || Config.isTest()
                ? {
                    ...exception.getPublicPlainData(),
                    ...exception.toPlainObject(),
                  }
                : exception.getPublicPlainData(),
          })
          .send();
      } else {
        const exceptionInstance = new InternalException(
          context.state.route,
          [String(exception)],
          {
            key: PublicExceptionKey.INTERNAL,
            details: [],
          },
          {
            contextState: context.state,
          }
        );

        if (Config.isDev()) {
          // eslint-disable-next-line no-console
          console.log(exception);
        }

        res
          .json({
            status: 'error',
            errors:
              Config.isDev() || Config.isTest()
                ? exceptionInstance.toPlainObject()
                : exceptionInstance.getPublicPlainData(),
          })
          .send();
      }
    }
  }
}
