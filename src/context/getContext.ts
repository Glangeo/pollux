import express from 'express';
import { Context } from './Context';

export function getContext(res: express.Response): Context {
  const context = res.locals.context;

  if (!context) {
    throw new Error('E_CONTEXT_NOT_DEFINED');
  }

  return context;
}
