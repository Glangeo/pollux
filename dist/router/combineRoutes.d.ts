import { IRoute } from './IRoute';
export declare function combineRoutes(routes: IRoute<any, any, any>[], options?: {
    pathPrefix?: string;
}): IRoute<any, any, any>[];
