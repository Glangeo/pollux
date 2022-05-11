import { Module } from 'src/core';

export interface IDistributedService {
  readonly modules: Module[];
}
