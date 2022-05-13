import { App } from 'src/core';
import { ServiceConstructor } from './ServiceConstructor';

export type AppConfiguration = {
  readonly app: App;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly services: ServiceConstructor[];
};
