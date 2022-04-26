import { ValidationResult } from './ValidationResult';
import { InferValidationSchema, ValidationSchema } from './ValidationSchema';

export type Validator = <T extends ValidationSchema>(
  schema: T,
  data: any
) => Promise<ValidationResult<InferValidationSchema<T>>>;
