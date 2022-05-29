import express from 'express';
import { Context } from 'src/api/context';
import { ValidationSchema } from 'src/api/validator';
import { CoreTypes } from 'src/core';
import { AnyEndpointMethod, EndpointMethod } from './EndpointMethod';
import { EndpointPartials } from './EndpointPartials';

/**
 * Stores information about API endpoint: method, route, validation schemas, middleware and handler
 *
 * @param validation specify validation schemas for request data. Used by Router
 * @param action called when all validation is passed successfully
 */
export type Endpoint<
  M extends EndpointMethod,
  Q extends ValidationSchema | undefined,
  P extends ValidationSchema | undefined,
  B extends ValidationSchema | undefined
> = {
  /**
   * Request method
   */
  readonly method: M;
  /**
   * Set of validation schemas for request data
   */
  readonly validation?: EndpointPartials.Validation<M, Q, P, B>;
  /**
   * Middlewares applied to this endpoint. Executes in the same order specified in the array
   */
  readonly middlewares?: CoreTypes.Api.Middleware[];
  /**
   * Handler that is called after successfull request data validation
   */
  readonly action: (
    data: EndpointPartials.RequestData<Q, P, B>,
    context: Context,
    req: express.Request,
    res: express.Response
  ) => Promise<any>;
  /**
   * Endpoint path
   *
   * NOTICE: Router will not add endpoint without route field specified. You can omit this field in configuration if you use collectEndpoints helper
   */
  readonly route?: string;
  /**
   * Calls before endpoint request data validation
   */
  readonly onBeforeValidation?: (
    req: express.Request,
    res: express.Response
  ) => Promise<void>;
};

/**
 * Helper for annotation endpoint with any cofiguration
 */
export type AnyEndpoint = Endpoint<
  AnyEndpointMethod,
  ValidationSchema | undefined,
  ValidationSchema | undefined,
  ValidationSchema | undefined
>;
