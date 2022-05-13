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
 * @param isStrict Yup `strict` property. If true, only validates input, and skips coersion or transformation
 * @returns validation result
 */
export const validate: Validator = async <T extends ValidationSchema>(
  schema: T,
  data: any,
  isStrict = true
): Promise<ValidationResult<InferValidationSchema<T>>> => {
  try {
    const result = await schema.validate(data, {
      stripUnknown: true,
      strict: isStrict,
    });

    return {
      isValid: true,
      data: result,
    };
  } catch (error) {
    if (!(error instanceof Yup.ValidationError)) {
      throw error;
    }

    const errors: string[] = [error.message];

    for (const inner of error.inner) {
      const { path, message } = inner;

      if (path && message) {
        errors.push(`${inner.path}: ${inner.message}`);
      }
    }

    return {
      errors,
      isValid: false,
    };
  }
};
