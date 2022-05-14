import { App } from 'src/core';

export type AppConfiguration = {
  readonly app: App;
  readonly host: string;
  readonly port: number;
  readonly childApps?: App[];
};
