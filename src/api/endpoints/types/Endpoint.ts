import express from 'express';
import { ValidationSchema } from 'src/api/validator';
import { AnyEndpointMethod, EndpointMethod } from './EndpointMethod';
import { EndpointPartials } from './EndpointPartials';

export type Endpoint<
  M extends EndpointMethod,
  Q extends ValidationSchema | undefined,
  P extends ValidationSchema | undefined,
  B extends ValidationSchema | undefined
> = {
  readonly method: M;
  readonly validation?: EndpointPartials.Validation<M, Q, P, B>;
  readonly action: (
    data: EndpointPartials.RequestData<Q, P, B>,
    req: express.Request,
    res: express.Response
  ) => Promise<any>;
  readonly route?: string;
};

export type AnyEndpoint = Endpoint<
  AnyEndpointMethod,
  ValidationSchema,
  ValidationSchema,
  ValidationSchema
>;
