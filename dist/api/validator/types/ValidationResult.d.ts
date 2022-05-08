/**
 * Result of data validation
 */
export declare type ValidationResult<T> = {
    readonly isValid: true;
    readonly data: T;
} | {
    readonly isValid: false;
    readonly errors: string[];
};
