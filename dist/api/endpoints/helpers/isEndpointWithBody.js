"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEndpointWithBody = void 0;
var EndpointMethod_1 = require("../types/EndpointMethod");
/**
 * Checks if given endpoint might accept a body request data
 *
 * @param endpoint an endpoint to check
 * @returns
 */
function isEndpointWithBody(endpoint) {
    var methodsWithBody = [EndpointMethod_1.EndpointMethod.POST, EndpointMethod_1.EndpointMethod.PUT];
    return methodsWithBody.includes(endpoint.method);
}
exports.isEndpointWithBody = isEndpointWithBody;
