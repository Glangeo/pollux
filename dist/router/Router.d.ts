import express from 'express';
import { Middleware } from '../types/Middleware';
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
export declare class Router {
    private config;
    constructor(config: IRouterConfig);
    getExpressRouter(): express.Router;
    private getRoutePath;
    private static getRequestHandler;
    private static callRouteAction;
}
