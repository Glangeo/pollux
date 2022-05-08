"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalException = void 0;
var common_1 = require("../../../api/common");
var Exception_1 = require("../Exception");
var ExceptionType_1 = require("./ExceptionType");
var InternalException = /** @class */ (function (_super) {
    __extends(InternalException, _super);
    function InternalException(properties) {
        return _super.call(this, __assign(__assign({}, properties), { type: ExceptionType_1.ExceptionType.Runtime, httpStatusCode: common_1.HTTPStatusCode.InternalServerError })) || this;
    }
    return InternalException;
}(Exception_1.Exception));
exports.InternalException = InternalException;