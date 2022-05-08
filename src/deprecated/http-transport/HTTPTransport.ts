import Axios, { AxiosRequestConfig } from 'axios';
import { castUnknownErrorToException } from 'src/core/exception/helpers';
import { IResponse } from './IResponse';

export interface IRequestConfig {
  headers?: AxiosRequestConfig['headers'];
  shouldUseBaseUrl?: boolean;
}

export class HTTPTransport {
  public constructor(private readonly baseUrl = '') {}

  public async request<T = unknown>(
    url: string,
    data: any = {},
    config: IRequestConfig = {}
  ): Promise<IResponse<T>> {
    const { shouldUseBaseUrl = true, headers = {} } = config;

    try {
      const response = await Axios.post<IResponse<T>>(
        this.getRequestUrl(url, shouldUseBaseUrl),
        data,
        {
          headers,
        }
      );

      return response.data;
    } catch (error) {
      throw castUnknownErrorToException(error);
    }
  }

  private getRequestUrl(url: string, shouldUseBaseUrl = true): string {
    if (shouldUseBaseUrl) {
      const prefixedUrl = `/${url}`
        .replace(/\/\/+/g, '/')
        .replace(/\/$/, '')
        .replace(/^\/*/, '/');

      return `${this.baseUrl}${prefixedUrl}`;
    }

    return url.replace(/\/$/, '').replace(/^\/*/, '/');
  }
}
