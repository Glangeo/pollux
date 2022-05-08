import dotenv from 'dotenv';

/**
 * Loads environment file
 *
 * @param filePath path to environment file
 * @param isDebugMode should enable logging
 */
export function loadEnvFile(filePath: string, isDebugMode?: boolean): void {
  const options: { path: string; debug?: boolean } = {
    path: filePath,
  };

  if (isDebugMode) {
    options.debug = true;
  }

  dotenv.config(options);
}
