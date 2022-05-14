import express from 'express';
import bodyParser from 'body-parser';
import merge from 'lodash/merge';
import { DevelopmentLogger, DevLogEvent, fixUrl } from 'src/local-utils';
import { ServiceConstructor } from 'src/distributed/http';
import { Module } from '../module';
import { InternalException } from '../exception';
import { AppOptions } from './types';

const DEFAULT_PORT = 3000;

export class App {
  public readonly server: express.Express;
  public readonly name: string;
  public services: ServiceConstructor[] = [];
  private _isInitied: boolean;

  private modulesQueue: Module[];
  private childAppQueue: [App, string?][] = [];

  public constructor(public readonly options: AppOptions = {}, name?: string) {
    this._isInitied = false;

    if (this.options.logging) {
      DevelopmentLogger.configuration = merge(
        {
          ...DevelopmentLogger.configuration,
        },
        this.options.logging
      );
    }

    this.name = name || this.constructor.name;
    this.modulesQueue = [];
    this.childAppQueue = [];
    this.server = express();
  }

  public async init(callback?: () => void): Promise<this> {
    await this.beforeInit();
    await this.applyMiddleware();

    await this.enableModules();

    for (const module of this.modulesQueue) {
      await this.addModule(module);
    }

    for (const [app, path] of this.childAppQueue) {
      await this.addChildApp(app, path);
    }

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

  public addModuleToQueue(module: Module): void {
    if (this.modulesQueue.includes(module)) {
      return;
    }

    this.modulesQueue.push(module);
  }

  public addChildAppToQueue(app: App, path?: string): void {
    const isAppAlreadyAdded = this.childAppQueue.find(
      ([_app]) => _app.name === app.name
    );

    if (isAppAlreadyAdded) {
      return;
    }

    this.childAppQueue.push([app, path]);
  }

  protected async addModule(module: Module): Promise<void> {
    const route = this.options.baseRoute || '/';

    if (module.init) {
      await module.init();
    }

    if (module.router) {
      this.server.use(route, module.router.getExpressRouter());
    }

    DevelopmentLogger.LOG(DevLogEvent.AppModuleAdded, module.name);
  }

  protected async addChildApp(app: App, path?: string): Promise<void> {
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
