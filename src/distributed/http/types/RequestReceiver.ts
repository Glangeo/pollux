import { Contract } from './Contract';

export type RequestReceiver<T> = {
  call(method: keyof T, params: any[]): Promise<Contract.Response>;
};
