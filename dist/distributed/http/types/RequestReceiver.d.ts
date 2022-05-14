import { Contract } from './Contract';
export declare type RequestReceiver<T> = {
    readonly service: string;
    call(method: keyof T, params: any[]): Promise<Contract.Response>;
};
