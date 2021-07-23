import { Context } from '../context';
import { ExceptionType } from './ExceptionType';

export interface IExceptionMeta {
  contextState?: Context['state'];
}

export interface IPublicMeta {
  key: string;
  details: string[];
}

export abstract class Exception<
  T = ExceptionType,
  U extends IExceptionMeta = IExceptionMeta
> {
  public abstract type: T;

  public constructor(
    public readonly action: string,
    public readonly details: string[],
    public readonly publicMeta?: IPublicMeta,
    public readonly meta?: U
  ) {}

  public toPlainObject(): Record<string, unknown> {
    return {
      name: this.constructor.name,
      type: this.type,
      action: this.action,
      details: this.details,
      meta: this.meta,
    };
  }

  public getPublicPlainData(): Record<string, unknown> {
    return {
      key: this.publicMeta?.key,
      details: this.publicMeta?.details,
    };
  }
}
