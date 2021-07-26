"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var Exception = /** @class */ (function () {
    function Exception(action, details, publicMeta, meta) {
        this.action = action;
        this.details = details;
        this.publicMeta = publicMeta;
        this.meta = meta;
    }
    Exception.prototype.toPlainObject = function () {
        return {
            name: this.constructor.name,
            type: this.type,
            action: this.action,
            details: this.details,
            meta: this.meta,
        };
    };
    Exception.prototype.getPublicPlainData = function () {
        var _a, _b;
        return {
            key: (_a = this.publicMeta) === null || _a === void 0 ? void 0 : _a.key,
            details: (_b = this.publicMeta) === null || _b === void 0 ? void 0 : _b.details,
        };
    };
    return Exception;
}());
exports.Exception = Exception;
