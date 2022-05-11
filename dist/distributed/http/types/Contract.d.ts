import { CoreTypes } from '../../../core';
export declare namespace Contract {
    type Request = {
        readonly method: string;
        readonly args: (CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object)[];
    };
    type Response = {
        readonly method: string;
        readonly result: CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object | (CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object)[];
    };
}
