import { AnyEndpoint } from '../types/Endpoint';
/**
 * Collects endpoints from their files inside specified folder
 *
 * @param dirname path to folder where endpoints are stored
 * @returns array of collected from folder endpoints
 */
export declare function collectEndpoints(dirname: string): AnyEndpoint[];
