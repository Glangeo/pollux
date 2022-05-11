import { RequestEmitter, ServiceConstructor, Contract } from '../types';
export declare function getRequestEmitter<T extends ServiceConstructor>(constructor: T, onRequest: (request: Contract.Request) => Promise<Contract.Response>): RequestEmitter<T>;
