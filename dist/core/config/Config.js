"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var types_1 = require("./types");
/**
 * Global configuration class. Singleton.
 * Used to store application specific data
 */
var Config = /** @class */ (function () {
    function Config() {
    }
    /**
     * Returns app startup environment
     *
     * @returns current environment
     */
    Config.getEnvironment = function () {
        var env = process.env.NODE_ENV || types_1.Environment.Production;
        var environments = [
            types_1.Environment.Development,
            types_1.Environment.Testing,
            types_1.Environment.Demo,
            types_1.Environment.Production,
        ];
        if (environments.includes(env)) {
            return env;
        }
        return types_1.Environment.Production;
    };
    /**
     * Gets environment variable value and throws error if value is missing
     *
     * @param name variable name
     * @returns variables value from .env files
     */
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
