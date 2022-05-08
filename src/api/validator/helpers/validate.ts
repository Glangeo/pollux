import * as Yup from 'yup';
import {
  InferValidationSchema,
  ValidationResult,
  ValidationSchema,
  Validator,
} from '../types';

/**
 * Validates data using validation schema
 *
 * @param schema data validation schema
 * @param data data to validate
 * @returns validation result
 */
export const validate: Validator = async <T extends ValidationSchema>(
  schema: T,
  data: any
): Promise<ValidationResult<InferValidationSchema<T>>> => {
  try {
    const result = await schema.validate(data, {
      stripUnknown: true,
      strict: true,
    });

    return {
      isValid: true,
      data: result,
    };
  } catch (error) {
    if (!(error instanceof Yup.ValidationError)) {
      throw error;
    }

    return {
      isValid: false,
      errors: error.errors,
    };
  }
};
