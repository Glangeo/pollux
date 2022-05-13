import { Validator } from '../types';
/**
 * Validates data using validation schema
 *
 * @param schema data validation schema
 * @param data data to validate
 * @param isStrict Yup `strict` property. If true, only validates input, and skips coersion or transformation
 * @returns validation result
 */
export declare const validate: Validator;
