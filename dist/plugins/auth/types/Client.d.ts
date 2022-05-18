import { CoreTypes } from '../../../core';
export declare namespace ClientPartials {
    type Type = CoreTypes.PlainTypes.Primitive;
    type Permissions = CoreTypes.PlainTypes.Object | CoreTypes.PlainTypes.Primitive;
    type Meta = CoreTypes.PlainTypes.Object | CoreTypes.PlainTypes.Primitive;
}
export declare type Client<T extends CoreTypes.PlainTypes.Primitive = string, P extends ClientPartials.Permissions = null, M extends ClientPartials.Meta = null> = {
    readonly id: number;
    readonly type: T;
    readonly refreshedAt: number;
    readonly isBlocked: boolean;
    readonly credentialsId: number;
    readonly permissions: P;
    readonly meta: M;
    readonly createdAt: number;
};
