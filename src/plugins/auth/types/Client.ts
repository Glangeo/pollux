import { CoreTypes } from 'src/core';

export namespace ClientPartials {
  export type Type = CoreTypes.PlainTypes.Primitive;

  export type Permissions =
    | CoreTypes.PlainTypes.Object
    | CoreTypes.PlainTypes.Primitive;

  export type Meta =
    | CoreTypes.PlainTypes.Object
    | CoreTypes.PlainTypes.Primitive;
}

export type Client<
  T extends CoreTypes.PlainTypes.Primitive = string,
  P extends ClientPartials.Permissions = null,
  M extends ClientPartials.Meta = null
> = {
  readonly id: number;
  readonly type: T;
  readonly csrfToken: string | null;
  readonly refreshedAt: number;
  readonly isBlocked: boolean;
  readonly credentialsId: number;
  readonly permissions: P;
  readonly meta: M;
  readonly createdAt: number;
};
