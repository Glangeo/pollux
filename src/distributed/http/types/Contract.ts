import { CoreTypes } from 'src/core';

export namespace Contract {
  export type Request = {
    readonly method: string;
    readonly args: (
      | CoreTypes.PlainTypes.Primitive
      | CoreTypes.PlainTypes.Object
    )[];
  };

  export type Response = {
    readonly method: string;
    readonly result:
      | CoreTypes.PlainTypes.Primitive
      | CoreTypes.PlainTypes.Object
      | (CoreTypes.PlainTypes.Primitive | CoreTypes.PlainTypes.Object)[];
  };
}
