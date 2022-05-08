import * as Plain from './PlainTypes';
import * as _Api from './api';
import * as _Utils from './utils';
export declare namespace CoreTypes {
    namespace PlainTypes {
        type Primitive = Plain.Primitive;
        type Object = Plain.PlainObject;
    }
    namespace Api {
        type Middleware = _Api.Middleware;
    }
    namespace Utils {
        type AsyncFuncReturnType<T> = _Utils.AsyncFuncReturnType<T>;
    }
}
