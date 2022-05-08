import { Exception, ExceptionConstructionProperties } from '../Exception';
export declare type NotFoundExceptionPrivateMeta = {
    readonly collection: string;
    readonly query: string;
};
export declare class NotFoundException extends Exception<NotFoundExceptionPrivateMeta, any> {
    constructor(properties: Omit<ExceptionConstructionProperties<NotFoundExceptionPrivateMeta, any>, 'type'>);
}
