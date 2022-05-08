"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = void 0;
var types_1 = require("../types");
/**
 * Helper for easy creation ErrorResponse object
 *
 * @param context message describing context of occured error
 * @param meta meta information abount an error
 * @returns ErrorResponse
 */
function createErrorResponse(context, meta) {
    return {
        status: types_1.ResponseStatus.Error,
        error: {
            context: context,
            meta: meta,
        },
    };
}
exports.createErrorResponse = createErrorResponse;
