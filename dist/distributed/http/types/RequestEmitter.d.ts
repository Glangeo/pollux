export declare type RequestEmitter<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? T[K] : unknown;
};
