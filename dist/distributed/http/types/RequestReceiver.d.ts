import { Contract } from './Contract';
export declare type RequestReceiver<T> = {
    isActive(): Promise<void>;
    call(method: keyof T, params: any[]): Promise<Contract.Response>;
};
