import { RequestEmitter, ServiceConstructor, Contract } from '../types';
declare type RequestHandler = (request: Contract.Request) => Promise<Contract.Response>;
export declare function getRequestEmitter<T extends ServiceConstructor>(constructor: T, onRequest: RequestHandler): RequestEmitter<InstanceType<T>>;
export {};
