import express from 'express';
export declare type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
