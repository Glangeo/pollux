import { App, Module } from 'src/core';

export interface IDistributedService {
  getApp(): App;

  getModules(): Module[];
}
