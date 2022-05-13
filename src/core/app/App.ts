import express from 'express';
import bodyParser from 'body-parser';
import merge from 'lodash/merge';
import { DevelopmentLogger, DevLogEvent, fixUrl } from 'src/local-utils';
import { Module } from '../module';
import { InternalException } from '../exception';
import { AppOptions } from './types';

const DEFAULT_PORT = 3000;

export class App {
  public readonly server: express.Express;
  private _isInitied: boolean;

  public constructor(
    public readonly options: AppOptions = {},
    public readonly name = 'Anonymous'
  ) {
    this._isInitied = false;

    if (this.options.logging) {
      DevelopmentLogger.configuration = merge(
        {
          ...DevelopmentLogger.configuration,
        },
        this.options.logging
      );
    }

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

    this._isInitied = true;

    DevelopmentLogger.LOG(DevLogEvent.AppInit, this.name);

    return this;
  }

  public listen(callback?: (port: number) => void): void {
    const port = this.options.port || DEFAULT_PORT;

    this.server.listen(port, callback ? () => callback(port) : undefined);
  }

  public async enableModules(): Promise<void> {}

  public async addModule(module: Module): Promise<void> {
    const route = this.options.baseRoute || '/';

    if (module.init) {
      await module.init();
    }

    if (module.router) {
      this.server.use(route, module.router.getExpressRouter());
    }

    DevelopmentLogger.LOG(DevLogEvent.AppModuleAdded, module.name);
  }

  public async addChildApp(app: App, path?: string): Promise<void> {
    if (app._isInitied) {
      throw new InternalException({
        message: 'Could add already inited app as a child.',
      });
    }

    app.options.baseRoute = undefined;

    await app.init();

    const appPath = [this.options.baseRoute];

    if (path) {
      appPath.push(path);
    }

    const url = fixUrl(appPath.join('/'));
    this.server.use(url, app.server);

    DevelopmentLogger.LOG(DevLogEvent.AppChildAdded, `${app.name} on ${url}`);
  }

  protected async beforeInit(): Promise<void> {}

  protected async afterInit(): Promise<void> {}

  protected async applyMiddleware(): Promise<void> {
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
  }
}
