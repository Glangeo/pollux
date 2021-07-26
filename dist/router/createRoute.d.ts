import * as Yup from 'yup';
import { IRoute } from './IRoute';
export declare function createRoute<T extends Yup.ObjectSchema<any>, U extends any, K extends any>(route: IRoute<T, U, K>): IRoute<T, U, K>;
