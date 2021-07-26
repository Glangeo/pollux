"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.isDev = function () {
        var environment = process.env.ENV;
        if (environment === 'development') {
            return true;
        }
        return false;
    };
    Config.isTest = function () {
        var environment = process.env.ENV;
        if (environment === 'test') {
            return true;
        }
        return false;
    };
    Config.getPort = function () {
        return Number(this.safeGetEnvVar('PORT'));
    };
    Config.setIsLoggingEnabled = function (isEnabled) {
        this.isLoggingEnabled = isEnabled;
    };
    Object.defineProperty(Config, "IS_LOGGING_ENABLED", {
        get: function () {
            return this.isLoggingEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Config.safeGetEnvVar = function (name) {
        var variable = process.env[name];
        if (!variable) {
            throw new Error("[ERROR][CONFIG] " + name + " not defined in .env*");
        }
        return variable;
    };
    return Config;
}());
exports.Config = Config;
