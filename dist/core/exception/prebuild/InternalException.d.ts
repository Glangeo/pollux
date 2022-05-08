import { Exception, ExceptionConstructionProperties } from '../Exception';
export declare type InternalExceptionPrivateMeta = {
    readonly description: string[];
};
export declare class InternalException extends Exception<InternalExceptionPrivateMeta, any> {
    constructor(properties: Omit<ExceptionConstructionProperties<InternalExceptionPrivateMeta, any>, 'type'>);
}
