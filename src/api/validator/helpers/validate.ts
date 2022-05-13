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

    const errors: string[] = [formatYupError(error.message, error.path)];

    for (const inner of error.inner) {
      const { message, path } = inner;

      errors.push(formatYupError(message, path));
    }

    return {
      errors,
      isValid: false,
    };
  }
};

function formatYupError(message: string, path?: string): string {
  if (path) {
    return `${path}: ${message}`;
  }

  return message;
}
