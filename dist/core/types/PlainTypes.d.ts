export declare type Primitive = number | string | boolean | symbol | null | undefined;
export declare type PlainObject = {
    [K in string | number]: Primitive | Primitive[] | PlainObject | PlainObject[];
};
