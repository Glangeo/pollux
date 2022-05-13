import { CoreTypes } from '../../../core';
export declare namespace Contract {
    type Request = {
        readonly service: string;
        readonly method: string;
        readonly args: (CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object)[];
    };
    type Response = {
        readonly service: string;
        readonly method: string;
        readonly result: CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object | (CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object)[];
    };
}
