"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouterDefaultExceptionHandler = void 0;
var common_1 = require("../../common");
var helpers_1 = require("../../response/helpers");
var config_1 = require("../../../core/config");
var types_1 = require("../../../core/config/types");
var exception_handler_1 = require("../../../core/exception-handler");
var prebuild_1 = require("../../../core/exception/prebuild");
function getRouterDefaultExceptionHandler(req, res, endpoint, isFullProjection) {
    if (isFullProjection === void 0) { isFullProjection = config_1.Config.getEnvironment() !== types_1.Environment.Production; }
    var handler = new exception_handler_1.ExceptionHandler();
    var pipe = new exception_handler_1.ExceptionPipe(function (exception) {
        var _a;
        var meta = isFullProjection
            ? exception.getPublicProjection()
            : exception.getFullProjection();
        var context = isFullProjection
            ? exception.message
            : (_a = exception.publicInfo) === null || _a === void 0 ? void 0 : _a.message;
        var response = (0, helpers_1.createErrorResponse)(context || '', meta);
        var httpStatusCode = exception.httpStatusCode ||
            getHttpStatusCodeFromExceptionType(exception.type);
        res.status(httpStatusCode).json(response);
    });
    handler.on('all', pipe);
    return handler;
}
exports.getRouterDefaultExceptionHandler = getRouterDefaultExceptionHandler;
function getHttpStatusCodeFromExceptionType(type) {
    switch (type) {
        case prebuild_1.ExceptionType.Validation:
        case prebuild_1.ExceptionType.Domain:
            return common_1.HTTPStatusCode.BadRequest;
        default:
            return common_1.HTTPStatusCode.InternalServerError;
    }
}
