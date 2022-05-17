import { CoreTypes } from '../../../core';
export declare namespace CredentialsPartials {
    type Meta = CoreTypes.PlainTypes.Object | CoreTypes.PlainTypes.Primitive;
}
export declare type Credentials<M extends CredentialsPartials.Meta = null> = {
    readonly id: number;
    readonly login: string;
    readonly salt: string;
    readonly hashedPassword: string;
    readonly csrfToken: string | null;
    readonly meta: M;
    readonly createdAt: number;
};
