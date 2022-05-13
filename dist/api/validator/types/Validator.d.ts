import { ValidationResult } from './ValidationResult';
import { InferValidationSchema, ValidationSchema } from './ValidationSchema';
/**
 * Type of fucntion used for validating data
 */
export declare type Validator = <T extends ValidationSchema>(schema: T, data: any, isStrict: boolean) => Promise<ValidationResult<InferValidationSchema<T>>>;
