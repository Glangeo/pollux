import { InferValidationSchema, ValidationSchema } from '../../validator';
import { EndpointMethod, EndpointMethodWithBody } from './EndpointMethod';
/**
 * Namespace for storing partial types of Endpoint
 */
export declare namespace EndpointPartials {
    /**
     * Type for declaring query, params and body validations schemas
     */
    type Validation<M extends EndpointMethod, Q extends ValidationSchema | undefined, P extends ValidationSchema | undefined, B extends ValidationSchema | undefined> = {
        readonly query: Q;
        readonly params: P;
    } & (M extends EndpointMethodWithBody ? {
        readonly body: B;
    } : {});
    /**
     * Type for declaring query, params and body data after succeessful validation
     */
    type RequestData<Q extends ValidationSchema | undefined, P extends ValidationSchema | undefined, B extends ValidationSchema | undefined> = {} & (Q extends ValidationSchema ? RequestDataWithQuery<Q> : {}) & (P extends ValidationSchema ? RequestDataWithParams<P> : {}) & (B extends ValidationSchema ? RequestDataWithBody<B> : {});
    /**
     * Type for request data if query validation schema was passed
     */
    type RequestDataWithQuery<Q extends ValidationSchema> = {
        readonly query: InferValidationSchema<Q>;
    };
    /**
     * Type for request data if params validatoin schema was passed
     */
    type RequestDataWithParams<P extends ValidationSchema> = {
        readonly params: InferValidationSchema<P>;
    };
    /**
     * Type for request data if body validation schema was passed
     */
    type RequestDataWithBody<B extends ValidationSchema> = {
        readonly body: InferValidationSchema<B>;
    };
}
