import express from 'express';
import { Context } from '../Context';
/**
 * Stores Context in response.locals field
 *
 * @param context Context
 * @param res express response
 */
export declare function setContext(context: Context, res: express.Response): void;
