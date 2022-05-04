import express from 'express';
import { createErrorResponse } from 'src/api/response/helpers';
import { HTTPStatusCode } from 'src/api/response/types';
import { Config } from 'src/config';
import {
  ExceptionHandler,
  ExceptionPipe,
  IExceptionHandler,
} from 'src/core/exception-handler';
import { ExceptionType } from 'src/core/exception/prebuild';

export function getRouterDefaultExceptionHandler(
  req: express.Request,
  res: express.Response
): IExceptionHandler {
  const handler = new ExceptionHandler();

  const pipe = new ExceptionPipe((exception) => {
    const isFull = Config.isDev() || Config.isTest();

    const meta = isFull
      ? exception.getPublicProjection()
      : exception.getFullProjection();
    const context = isFull ? exception.message : exception.publicInfo?.message;
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
