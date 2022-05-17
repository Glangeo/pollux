"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var api_1 = require("../../../api");
var core_1 = require("../../../core");
var JWT = /** @class */ (function () {
    function JWT(secret) {
        this.secret = secret;
    }
    JWT.prototype.getToken = function (payload, options) {
        var token = (0, jsonwebtoken_1.sign)(payload, this.secret, options);
        return token;
    };
    JWT.prototype.decodeToken = function (token, options) {
        try {
            var payload = (0, jsonwebtoken_1.verify)(token, this.secret, options);
            return payload;
        }
        catch (error) {
            throw new core_1.ValidationException({
                message: 'Token is invalid.',
                meta: {
                    errors: ["Error: ".concat(String(error))],
                },
                httpStatusCode: api_1.HTTPStatusCode.Unauthorized,
                publicInfo: {
                    message: 'Token is invalid.',
                },
            });
        }
    };
    return JWT;
}());
exports.JWT = JWT;
