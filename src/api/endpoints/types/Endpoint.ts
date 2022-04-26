import express from 'express';
import { ValidationSchema } from 'src/api/validator';
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
   * Handler that is called after successfull request data validation
   */
  readonly action: (
    data: EndpointPartials.RequestData<Q, P, B>,
    req: express.Request,
    res: express.Response
  ) => Promise<any>;
  /**
   * Endpoint path
   *
   * NOTICE: Router will not add endpoint without route field specified. You can omit this field in configuration if you use collectEndpoints helper
   */
  readonly route?: string;
};

/**
 * Helper for annotation endpoint with any cofiguration
 */
export type AnyEndpoint = Endpoint<
  AnyEndpointMethod,
  ValidationSchema,
  ValidationSchema,
  ValidationSchema
>;
