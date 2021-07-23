import dotenv from 'dotenv';

export function loadEnvFile(filePath: string, isDebugMode?: boolean): void {
  const options: { path: string; debug?: boolean } = {
    path: filePath,
  };

  if (isDebugMode) {
    options.debug = true;
  }

  dotenv.config(options);
}
