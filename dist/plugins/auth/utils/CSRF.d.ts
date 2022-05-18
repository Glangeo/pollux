/// <reference types="node" />
import { BinaryToTextEncoding } from 'crypto';
export declare class CSRF {
    protected readonly saltSize: number;
    protected readonly algorithm: string;
    protected readonly encoding: BinaryToTextEncoding;
    constructor(saltSize?: number, algorithm?: string, encoding?: BinaryToTextEncoding);
    getToken(): string;
}
