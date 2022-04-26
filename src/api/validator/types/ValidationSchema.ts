import * as Yup from 'yup';

// Think, how we can declare validation type from outside
// It is needed, if coder would like to use custom validation system
/**
 * Type for validation schema of data passed through request
 */
export type ValidationSchema = Yup.ObjectSchema<any>;
/**
 * Type for infering clear data interfaces from validation schema
 */
export type InferValidationSchema<
  T extends ValidationSchema
> = Yup.InferType<T>;
