import express from 'express';
import bodyParser from 'body-parser';
import merge from 'lodash/merge';
import { DevelopmentLogger, DevLogEvent } from '../../utils';
import { Module } from '../module';
import { AppOptions } from './types';

const DEFAULT_PORT = 3000;

export abstract class App {
  public readonly server: express.Express;
  protected readonly route: string;

  public constructor(private readonly options: AppOptions = {}) {
    if (this.options.logging) {
      DevelopmentLogger.configuration = merge(
        {
          ...DevelopmentLogger.configuration,
        },
        this.options.logging
      );
    }

    this.route = this.options?.baseRoute || '/';
    this.server = express();
  }

  public async init(callback?: () => void): Promise<this> {
    await this.beforeInit();
    await this.applyMiddleware();
    await this.enableModules();
    await this.afterInit();

    if (callback) {
      callback();
    }

    return this;
  }

  public listen(callback?: (port: number) => void): void {
    const port = this.options.port || DEFAULT_PORT;

    this.server.listen(port, callback ? () => callback(port) : undefined);
  }

  public abstract enableModules(): Promise<void>;

  protected async beforeInit(): Promise<void> {}

  protected async afterInit(): Promise<void> {}

  protected async addModule(module: Module): Promise<void> {
    if (module.init) {
      await module.init();
    }

    if (module.router) {
      this.server.use(this.route, module.router.getExpressRouter());
    }

    DevelopmentLogger.LOG(DevLogEvent.AppModuleAdded, module.name);
  }

  protected async applyMiddleware(): Promise<void> {
    this.server.use(bodyParser.json());
  }
}
