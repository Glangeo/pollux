import { AxiosRequestConfig } from 'axios';
import { IResponse } from './IResponse';
export interface IRequestConfig {
    headers?: AxiosRequestConfig['headers'];
    shouldUseBaseUrl?: boolean;
}
export declare class HTTPTransport {
    private readonly baseUrl;
    constructor(baseUrl?: string);
    request<T = unknown>(url: string, data?: any, config?: IRequestConfig): Promise<IResponse<T>>;
    private getRequestUrl;
}
