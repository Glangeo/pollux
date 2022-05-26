export declare type SettersMap<M extends string, P, U> = {
    [K in M]: (value: P) => U;
};
