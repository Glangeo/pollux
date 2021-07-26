import * as Yup from 'yup';
import { Context } from '../context/Context';
import { Form } from '../types/Form';
import { Middleware } from '../types/Middleware';
export interface IRoute<T extends Yup.ObjectSchema<any>, U extends any, K extends any> {
    path: string;
    schema: T;
    action: (form: Form<T>, context: Context) => Promise<U>;
    decoration: (result: any, context: Context) => Promise<K> | K;
    middleware?: Middleware[];
    isPrefixedByBaseRoute?: boolean;
}
