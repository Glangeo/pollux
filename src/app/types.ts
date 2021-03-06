import { DeepPartial } from 'utility-types';
import { DevelopmentLoggerConfiguration } from '../utils/DevelopmentLogger';

export interface IAppOptions {
  /**
   * Application URL route. If provided, all application modules will use this route prefix
   */
  baseRoute?: string;

  /**
   * Enable dev logs
   *
   * @deprecated
   */
  areLogsEnabled?: boolean;

  /**
   * Logging configuration
   */
  logging?: DeepPartial<DevelopmentLoggerConfiguration>;
}
