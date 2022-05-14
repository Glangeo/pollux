import { AppConfiguration } from './AppConfiguration';

export type StartupConfig = {
  readonly currentAppName: string;
  readonly apps: AppConfiguration[];
};
