import express from 'express';
import { IExceptionHandler } from '../../core/exception-handler';
import { Optional } from 'utility-types';
import { AnyEndpoint } from '../endpoints';
import { Validator } from '../validator';
/**
 * Router configuration
 */
export declare type RouterConfiguration = {
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
    readonly validate: Validator;
    /**
     * Exception handling mechanism
     */
    readonly getRouterExceptionHandler: (req: express.Request, res: express.Response, endpoint: AnyEndpoint) => IExceptionHandler;
};
/**
 * Adds each endpoint to express.Router, adds validations mechanism and wraps every request with exception handler
 */
export declare class Router {
    private static readonly DEFAULT_CONFIG;
    private readonly config;
    constructor(config: Optional<RouterConfiguration>);
    /**
     * Adds all endpoints with validations and exception handling wrapper to newly created express router
     *
     * @returns configurated express router instance
     */
    getExpressRouter(): express.Router;
    private createRequestHandler;
    private wrapWithExceptionHandler;
    private tryGetRequestData;
}
