export declare type IResponse<T> = ISuccessResponse<T> | IErrorResponse<T>;
export declare type ISuccessResponse<T = unknown> = {
    status: 'success';
    result: T;
};
export declare type IErrorResponse<T = unknown> = {
    status: 'error';
    errors: T;
};
