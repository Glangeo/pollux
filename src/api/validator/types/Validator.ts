import { ValidationResult } from './ValidationResult';
import { InferValidationSchema, ValidationSchema } from './ValidationSchema';

/**
 * Type of fucntion used for validating data
 */
export type Validator = <T extends ValidationSchema>(
  schema: T,
  data: any
) => Promise<ValidationResult<InferValidationSchema<T>>>;
