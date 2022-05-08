import express from 'express';
import { AnyEndpoint } from '../../endpoints';
import { IExceptionHandler } from '../../../core/exception-handler';
export declare function getRouterDefaultExceptionHandler(req: express.Request, res: express.Response, endpoint: AnyEndpoint, isFullProjection?: boolean): IExceptionHandler;
