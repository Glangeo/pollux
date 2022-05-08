import express from 'express';
import { HTTPStatusCode } from 'src/api/common';
import { createErrorResponse } from 'src/api/response/helpers';
import { Config } from 'src/core/config';
import { Environment } from 'src/core/config/types';
import {
  ExceptionHandler,
  ExceptionPipe,
  IExceptionHandler,
} from 'src/core/exception-handler';
import { ExceptionType } from 'src/core/exception/prebuild';

export function getRouterDefaultExceptionHandler(
  req: express.Request,
  res: express.Response,
  isFullProjection = Config.getEnvironment() !== Environment.Production
): IExceptionHandler {
  const handler = new ExceptionHandler();

  const pipe = new ExceptionPipe((exception) => {
    const meta = isFullProjection
      ? exception.getPublicProjection()
      : exception.getFullProjection();
    const context = isFullProjection
      ? exception.message
      : exception.publicInfo?.message;
    const response = createErrorResponse(context || '', meta);

    const httpStatusCode =
      exception.httpStatusCode ||
      getHttpStatusCodeFromExceptionType(exception.type);

    res.status(httpStatusCode).json(response);
  });

  handler.on('all', pipe);

  return handler;
}

function getHttpStatusCodeFromExceptionType(
  type: ExceptionType | string
): HTTPStatusCode {
  switch (type) {
    case ExceptionType.Validation:
    case ExceptionType.Domain:
      return HTTPStatusCode.BadRequest;

    default:
      return HTTPStatusCode.InternalServerError;
  }
}
