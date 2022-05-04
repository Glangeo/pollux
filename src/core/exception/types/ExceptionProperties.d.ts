import { CoreTypes } from 'src/core/types';

export type ExceptionProperties<
  T extends CoreTypes.PlainTypes.Object,
  U extends CoreTypes.PlainTypes.Object
> = {
  readonly stack: string;
  readonly type: string;
  readonly message: string;
  readonly httpStatusCode?: number;
  readonly meta?: T;
  readonly publicInfo?: {
    readonly message: string;
    readonly meta?: U;
  };
};
