"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var Exception = /** @class */ (function () {
    function Exception(params) {
        var type = params.type, message = params.message, meta = params.meta, publicInfo = params.publicInfo, httpStatusCode = params.httpStatusCode, stack = params.stack;
        this.type = type;
        this.message = message;
        this.meta = meta;
        this.publicInfo = publicInfo;
        this.httpStatusCode = httpStatusCode;
        this.stack = stack || '';
        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    Exception.prototype.toString = function () {
        return "".concat(this.constructor.name, ": ").concat(this.message);
    };
    Exception.prototype.getFullProjection = function () {
        return {
            name: this.constructor.name,
            type: this.type,
            message: this.message,
            httpStatusCode: this.httpStatusCode,
            meta: this.meta,
            publicInfo: this.publicInfo,
            stack: this.stack,
        };
    };
    Exception.prototype.getPublicProjection = function () {
        var _a, _b;
        return {
            name: this.constructor.name,
            type: this.type,
            message: (_a = this.publicInfo) === null || _a === void 0 ? void 0 : _a.message,
            httpStatusCode: this.httpStatusCode,
            meta: (_b = this.publicInfo) === null || _b === void 0 ? void 0 : _b.meta,
        };
    };
    return Exception;
}());
exports.Exception = Exception;
