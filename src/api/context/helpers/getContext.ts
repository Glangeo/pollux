import express from 'express';
import { Context } from '../Context';

/**
 * Gets Context instance from response.
 * @warning If there is no context in response, getContext will create in automatically with extendableState as {}
 *
 * @param req express request
 * @param res express response
 * @returns Context
 */
export function getContext(
  req: express.Request,
  res: express.Response
): Context {
  const context = res.locals.context;

  if (!context) {
    const newContext = new Context({
      route: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
      extendableState: {},
    });

    res.locals.context = newContext;

    return newContext;
  }

  return context;
}
