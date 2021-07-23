import * as Yup from 'yup';

export type Form<T extends Yup.AnySchema> = Yup.InferType<T>;
