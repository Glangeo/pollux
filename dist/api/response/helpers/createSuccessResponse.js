"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = void 0;
var types_1 = require("../types");
/**
 * Helper for easy creation SuccessResponse object
 *
 * @param data response data
 * @returns SuccessResponse
 */
function createSuccessResponse(data) {
    return {
        status: types_1.ResponseStatus.Success,
        data: data,
    };
}
exports.createSuccessResponse = createSuccessResponse;
