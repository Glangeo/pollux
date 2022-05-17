/// <reference types="node" />
export declare type SaltOptions = {
    size?: number;
    encoding?: BufferEncoding;
};
export declare type HashOptions = {
    iterations?: number;
    keylen?: number;
    digest?: string;
    encoding?: BufferEncoding;
};
export declare class PBKDF2 {
    protected readonly options: {
        salt?: SaltOptions;
        hash?: HashOptions;
    };
    constructor(options?: {
        salt?: SaltOptions;
        hash?: HashOptions;
    });
    createSalt(): string;
    get(password: string, salt: string): string;
}
