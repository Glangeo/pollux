import express from 'express';
import bodyParser from 'body-parser';
import { DevelopmentLogger, DevLogEvent } from '../utils';
import { Config } from '../config';
import { IModule } from '../module';
import { IAppOptions } from './types';

const defaultAppOptions: IAppOptions = {};

// TODO: add jsdoc
export abstract class App {
  private readonly route: string;
  private readonly server: express.Express;

  public constructor(private readonly options: IAppOptions = {}) {
    const mergedOptions = {
      ...defaultAppOptions,
      ...options,
    };

    this.options = mergedOptions;

    this.route = this.options?.baseRoute || '/';
    this.server = express();
  }

  public async init(callback?: () => void): Promise<this> {
    await this.beforeInit();

    this.applyMiddleware();
    this.applyHeaders();
    await this.enableModules();

    await this.afterInit();

    if (callback) {
      callback();
    }

    return this;
  }

  public getExpressApp(): express.Express {
    return this.server;
  }

  public listen(callback?: (port: number) => void): void {
    this.server.listen(
      Config.getPort(),
      callback ? () => callback(Config.getPort()) : undefined
    );
  }

  public abstract enableModules(): Promise<void>;

  // eslint-disable-next-line class-methods-use-this
  protected async beforeInit(): Promise<void> {}

  // eslint-disable-next-line class-methods-use-this
  protected async afterInit(): Promise<void> {}

  protected async addModule(module: IModule): Promise<void> {
    if (module.init) {
      await module.init();
    }

    this.server.use(this.route, module.router.getExpressRouter());

    DevelopmentLogger.LOG(DevLogEvent.AppModuleAdded, module.name);
  }

  protected applyHeaders(): void {
    this.server.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      next();
    });
  }

  protected applyMiddleware(): void {
    this.server.use(bodyParser.json());
  }
}
