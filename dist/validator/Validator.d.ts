import * as Yup from 'yup';
export interface IFieldError {
    fieldName: string;
    message: string;
}
export interface IValidatationResult<T extends Record<string, unknown>> {
    errors?: IFieldError[];
    data?: T;
}
export declare class Validator {
    private data;
    private schema;
    constructor(data: unknown, schema: Yup.ObjectSchema<any>);
    validate<T extends Record<string, unknown>>(): Promise<IValidatationResult<T>>;
}
