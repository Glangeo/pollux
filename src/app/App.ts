import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { loadEnvFile, DevelopmentLogger, DevLogEvent } from '../utils';
import { Config } from '../config';
import { IModule } from '../module';
import { IAppOptions } from './types';

// TODO: move to separate file
const ENV_LOCAL_FILENAME = '.env.local';
const ENV_DEV_FILENAME = '.env.development';
const ENV_PROD_FILENAME = '.env.production';

const defaultAppOptions: IAppOptions = {
  shouldLoadEnvFiles: true,
};

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

    if (this.options.shouldLoadEnvFiles) {
      App.LOAD_ENVIRONMENT();
    }
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

  private static LOAD_ENVIRONMENT(): void {
    const getEnvPath = (filename: string) => path.join(process.cwd(), filename);

    const localPath = getEnvPath(ENV_LOCAL_FILENAME);
    const devPath = getEnvPath(ENV_DEV_FILENAME);
    const prodPath = getEnvPath(ENV_PROD_FILENAME);

    if (fs.existsSync(localPath)) {
      loadEnvFile(localPath, false);

      DevelopmentLogger.LOG(DevLogEvent.EnvFileLoaded, ENV_LOCAL_FILENAME);
    }

    if (Config.isDev() && fs.existsSync(devPath)) {
      loadEnvFile(devPath, false);

      DevelopmentLogger.LOG(DevLogEvent.EnvFileLoaded, ENV_DEV_FILENAME);
    }

    if (!Config.isDev() && fs.existsSync(prodPath)) {
      loadEnvFile(prodPath, false);

      DevelopmentLogger.LOG(DevLogEvent.EnvFileLoaded, ENV_PROD_FILENAME);
    }
  }
}
