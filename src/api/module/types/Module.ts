import { Router } from 'src/api/router/Router';

/**
 * High abstract group for set of endpoints. Module is commonly used for one service
 */
export type Module = {
  readonly name: string;
  readonly router?: Router;

  init?(): Promise<void>;
};
