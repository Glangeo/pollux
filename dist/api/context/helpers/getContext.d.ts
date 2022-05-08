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
export declare function getContext(req: express.Request, res: express.Response): Context;
