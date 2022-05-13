import { App, Module } from '../../../core';
export interface IDistributedService {
    getApp(): App;
    getModules(): Module[];
}
