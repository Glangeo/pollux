import { AnyEndpoint } from '../types/Endpoint';
/**
 * Collects endpoints from their files inside specified folder
 *
 * @param dirname path to folder where endpoints folder is placed
 * @param [folderName] folder name where endpoints are places
 * @returns array of collected from folder endpoints
 */
export declare function collectEndpoints(dirname: string, folderName?: string, endpointRegExp?: RegExp): AnyEndpoint[];
