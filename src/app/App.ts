import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { Config } from '../config';
import { IModule } from '../module';
import { loadEnvFile } from '../utils/loadEnvFile';
import { IAppOptions } from './types';

export abstract class App {
  private readonly route: string;
  private readonly server: express.Express;

  public constructor(private readonly options?: IAppOptions) {
    this.route = this.options?.baseRoute || '/';
    this.server = express();

    Config.setIsLoggingEnabled(Boolean(this.options?.areLogsEnabled));
  }

  public async init(callback?: () => void): Promise<this> {
    App._beforeInit(this.options?.areLogsEnabled);

    await this.beforeInit();

    this.applyMiddleware();
    this.applyHeaders();
    this.enableModules();

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

  public abstract enableModules(): void;

  // eslint-disable-next-line class-methods-use-this
  protected async beforeInit(): Promise<void> {}

  // eslint-disable-next-line class-methods-use-this
  protected async afterInit(): Promise<void> {}

  protected async addModule(module: IModule): Promise<void> {
    if (module.init) {
      await module.init();
    }

    if (this.options?.areLogsEnabled) {
      // eslint-disable-next-line no-console
      console.log('[LOGS][App] add module: ' + module.name);
    }

    this.server.use(this.route, module.router.getExpressRouter());
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

  private static _beforeInit(isDebugMode?: boolean): void {
    loadEnvFile(path.join(process.cwd(), '.env.local'), isDebugMode);

    if (Config.isDev()) {
      loadEnvFile(path.join(process.cwd(), '.env.development'), isDebugMode);
    } else {
      loadEnvFile(path.join(process.cwd(), '.env.production'), isDebugMode);
    }
  }
}
