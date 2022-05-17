"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRF = void 0;
var crypto_1 = require("crypto");
var CSRF = /** @class */ (function () {
    function CSRF(saltSize, algorithm, encoding) {
        if (saltSize === void 0) { saltSize = 1024; }
        this.saltSize = saltSize;
        this.algorithm = algorithm;
        this.encoding = encoding;
    }
    CSRF.prototype.getToken = function () {
        var salt = (0, crypto_1.randomBytes)(this.saltSize);
        var token = (0, crypto_1.createHash)(this.algorithm, salt)
            .update(salt)
            .digest(this.encoding);
        return token;
    };
    return CSRF;
}());
exports.CSRF = CSRF;
