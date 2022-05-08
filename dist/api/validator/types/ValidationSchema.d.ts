import * as Yup from 'yup';
/**
 * Type for validation schema of data passed through request
 */
export declare type ValidationSchema = Yup.ObjectSchema<any>;
/**
 * Type for infering clear data interfaces from validation schema
 */
export declare type InferValidationSchema<T extends ValidationSchema> = Yup.InferType<T>;
