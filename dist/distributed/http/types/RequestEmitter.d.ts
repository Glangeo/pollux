export declare type RequestEmitter<T> = {
    [K in keyof T]: T[K];
};