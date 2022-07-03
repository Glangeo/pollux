import { CoreTypes } from 'src/core';

export namespace ClientPartials {
  export type Type = CoreTypes.PlainTypes.Primitive;
  export type Meta =
    | CoreTypes.PlainTypes.Object
    | CoreTypes.PlainTypes.Primitive;

  export namespace Defaults {
    export type Type = string;
    export type Meta = {
      readonly ownerId: string;
    };
  }
}

export type Client<
  T extends ClientPartials.Type = ClientPartials.Defaults.Type,
  M extends ClientPartials.Meta = ClientPartials.Defaults.Meta
> = {
  readonly id: string;
  readonly type: T;
  readonly meta: M;
  readonly csrfToken: string;
  readonly expiresAt: number;
  readonly createdAt: number;
};
