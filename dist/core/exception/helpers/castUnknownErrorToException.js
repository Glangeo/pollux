"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castUnknownErrorToException = void 0;
var api_1 = require("../../../api");
var Exception_1 = require("../Exception");
var prebuild_1 = require("../prebuild");
function castUnknownErrorToException(error) {
    if (error instanceof Exception_1.Exception) {
        return error;
    }
    if (error instanceof Error) {
        return new Exception_1.Exception({
            type: prebuild_1.ExceptionType.Runtime,
            message: error.message,
            httpStatusCode: api_1.HTTPStatusCode.InternalServerError,
            stack: error.stack,
        });
    }
    return new Exception_1.Exception({
        type: prebuild_1.ExceptionType.Runtime,
        message: error.toString(),
        httpStatusCode: api_1.HTTPStatusCode.InternalServerError,
    });
}
exports.castUnknownErrorToException = castUnknownErrorToException;
