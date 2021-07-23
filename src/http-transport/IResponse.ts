export type IResponse<T> = ISuccessResponse<T> | IErrorResponse<T>;

export type ISuccessResponse<T = unknown> = {
  status: 'success';
  result: T;
};

export type IErrorResponse<T = unknown> = {
  status: 'error';
  errors: T;
};
