import fs from 'fs';
import path from 'path';
import { Environment } from 'src/core/config/types';
import { Config } from '../core/config';
import {
  DevelopmentLogger,
  DevLogEvent,
} from '../local-utils/DevelopmentLogger';
import { loadEnvFile } from './loadEnvFile';

/**
 * Loads environment files for current bootstrap environment
 *
 * @param folderPath path to folder where .env.* files are located
 */
export function loadEnvironment(folderPath = process.cwd()): void {
  const getEnvPath = (filename: string) => path.join(folderPath, filename);

  const environmentLocalsPaths = [
    'local',
    Environment.Production,
    Environment.Demo,
    Environment.Testing,
    Environment.Development,
  ].map((env) => ({
    env,
    name: `.env.${env}`,
    path: getEnvPath(`.env.${env}`),
  }));

  for (const { env, name, path } of environmentLocalsPaths) {
    const isEnvironmentMatches = Config.getEnvironment() === env;

    if ((isEnvironmentMatches || env === 'local') && fs.existsSync(path)) {
      loadEnvFile(path, false);

      DevelopmentLogger.LOG(DevLogEvent.EnvFileLoaded, name);
    }
  }
}
