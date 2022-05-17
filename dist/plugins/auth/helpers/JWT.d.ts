import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { CoreTypes } from '../../../core';
export declare type Payload = CoreTypes.PlainTypes.Object;
export declare class JWT<P extends Payload> {
    protected readonly secret: string;
    constructor(secret: string);
    getToken(payload: P, options?: SignOptions): string;
    decodeToken(token: string, options?: VerifyOptions): P;
}
