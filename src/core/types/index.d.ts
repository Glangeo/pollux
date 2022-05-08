import * as Plain from './PlainTypes';
import * as _Api from './api';
import * as _Utils from './utils';

export namespace CoreTypes {
  export namespace PlainTypes {
    export type Primitive = Plain.Primitive;
    export type Object = Plain.PlainObject;
  }

  export namespace Api {
    export type Middleware = _Api.Middleware;
  }

  export namespace Utils {
    export type AsyncFuncReturnType<T> = _Utils.AsyncFuncReturnType<T>;
  }
}
