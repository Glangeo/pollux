export type AsyncFuncReturnType<T> = T extends (...args: any) => any
  ? ReturnType<T> extends Promise<infer U>
    ? U
    : ReturnType<T>
  : T;
