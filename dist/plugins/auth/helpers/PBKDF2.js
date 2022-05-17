"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PBKDF2 = void 0;
var crypto_1 = require("crypto");
var PBKDF2 = /** @class */ (function () {
    function PBKDF2(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    PBKDF2.prototype.createSalt = function () {
        var _a = this.options.salt, saltOptions = _a === void 0 ? {} : _a;
        var _b = saltOptions.size, size = _b === void 0 ? 1024 : _b, _c = saltOptions.encoding, encoding = _c === void 0 ? 'hex' : _c;
        var salt = (0, crypto_1.randomBytes)(size).toString(encoding);
        return salt;
    };
    PBKDF2.prototype.get = function (password, salt) {
        var _a = this.options.hash, hashOptions = _a === void 0 ? {} : _a;
        var _b = hashOptions.iterations, iterations = _b === void 0 ? 2000 : _b, _c = hashOptions.keylen, keylen = _c === void 0 ? 64 : _c, _d = hashOptions.digest, digest = _d === void 0 ? 'sha512' : _d, _e = hashOptions.encoding, encoding = _e === void 0 ? 'hex' : _e;
        var hash = (0, crypto_1.pbkdf2Sync)(password, salt, iterations, keylen, digest).toString(encoding);
        return hash;
    };
    return PBKDF2;
}());
exports.PBKDF2 = PBKDF2;
