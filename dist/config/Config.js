"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
/**
 * Global configuration class. Singleton.
 * Used to store application specific data
 *
 * @todo remove methods: isDev(), isTest()
 */
var Config = /** @class */ (function () {
    function Config() {
    }
    /**
     * Indicates development bootstrap mode
     */
    Config.isDev = function () {
        var environment = process.env.ENV;
        if (environment === 'development') {
            return true;
        }
        return false;
    };
    /**
     * Indicates testing bootstrap mode
     */
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
