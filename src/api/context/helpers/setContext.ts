import express from 'express';
import { Context } from '../Context';

/**
 * Stores Context in response.locals field
 *
 * @param context Context
 * @param res express response
 */
export function setContext(context: Context, res: express.Response): void {
  res.locals.context = context;
}
