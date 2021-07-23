import express from 'express';
import { Context } from './Context';

export function setContext(context: Context, res: express.Response): void {
  res.locals.context = context;
}
