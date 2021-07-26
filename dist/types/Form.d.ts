import * as Yup from 'yup';
export declare type Form<T extends Yup.AnySchema> = Yup.InferType<T>;
