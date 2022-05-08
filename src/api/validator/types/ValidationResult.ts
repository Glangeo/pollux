/**
 * Result of data validation
 */
export type ValidationResult<T> =
  | {
      readonly isValid: true;
      readonly data: T;
    }
  | {
      readonly isValid: false;
      readonly errors: string[];
    };
