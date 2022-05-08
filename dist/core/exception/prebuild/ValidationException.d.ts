import { Exception, ExceptionConstructionProperties } from '../Exception';
export declare type ValidationExceptionPrivateMeta = {
    readonly errors: string[];
};
export declare class ValidationException extends Exception<ValidationExceptionPrivateMeta, any> {
    constructor(properties: Omit<ExceptionConstructionProperties<ValidationExceptionPrivateMeta, any>, 'type'>);
}
