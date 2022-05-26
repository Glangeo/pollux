export declare type SetterConfiguration<T> = {
    [K in keyof T]?: 'sync' | 'async';
};
