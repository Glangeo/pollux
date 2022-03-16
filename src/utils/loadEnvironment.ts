import fs from 'fs';
import path from 'path';
import { Config } from '../config';
import { DevelopmentLogger, DevLogEvent } from './DevelopmentLogger';
import { loadEnvFile } from './loadEnvFile';

const ENV_LOCAL_FILENAME = '.env.local';
const ENV_DEV_FILENAME = '.env.development';
const ENV_PROD_FILENAME = '.env.production';

export function loadEnvironment(): void {
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
