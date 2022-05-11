import { Contract } from './Contract';

export type RequestReceiver<T> = {
  isActive(): Promise<void>;

  call(method: keyof T, params: any[]): Promise<Contract.Response>;
};
