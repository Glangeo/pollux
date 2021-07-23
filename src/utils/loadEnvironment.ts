import path from 'path';
import { Config } from '../config';
import { loadEnvFile } from './loadEnvFile';

export function loadEnvironment(isDebugMode = false): void {
  loadEnvFile(path.join(process.cwd(), '.env.local'), isDebugMode);

  if (Config.isDev()) {
    loadEnvFile(path.join(process.cwd(), '.env.development'), isDebugMode);
  } else {
    loadEnvFile(path.join(process.cwd(), '.env.production'), isDebugMode);
  }
}
