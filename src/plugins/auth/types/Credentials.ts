import { CoreTypes } from 'src/core';

export namespace CredentialsPartials {
  export type Meta =
    | CoreTypes.PlainTypes.Object
    | CoreTypes.PlainTypes.Primitive;
}

export type Credentials<M extends CredentialsPartials.Meta = null> = {
  readonly id: number;
  readonly login: string;
  readonly salt: string;
  readonly hashedPassword: string;
  readonly meta: M;
  readonly createdAt: number;
};
