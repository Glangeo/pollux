"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvironment = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var types_1 = require("../core/config/types");
var config_1 = require("../core/config");
var DevelopmentLogger_1 = require("../local-utils/DevelopmentLogger");
var loadEnvFile_1 = require("./loadEnvFile");
/**
 * Loads environment files for current bootstrap environment
 */
function loadEnvironment() {
    var e_1, _a;
    var getEnvPath = function (filename) { return path_1.default.join(process.cwd(), filename); };
    var environmentLocalsPaths = [
        'local',
        types_1.Environment.Production,
        types_1.Environment.Demo,
        types_1.Environment.Testing,
        types_1.Environment.Development,
    ].map(function (env) { return ({
        env: env,
        name: ".env." + env,
        path: getEnvPath(".env." + env),
    }); });
    try {
        for (var environmentLocalsPaths_1 = __values(environmentLocalsPaths), environmentLocalsPaths_1_1 = environmentLocalsPaths_1.next(); !environmentLocalsPaths_1_1.done; environmentLocalsPaths_1_1 = environmentLocalsPaths_1.next()) {
            var _b = environmentLocalsPaths_1_1.value, env = _b.env, name_1 = _b.name, path_2 = _b.path;
            var isEnvironmentMatches = config_1.Config.getEnvironment() === env;
            if ((isEnvironmentMatches || env === 'local') && fs_1.default.existsSync(path_2)) {
                loadEnvFile_1.loadEnvFile(path_2, false);
                DevelopmentLogger_1.DevelopmentLogger.LOG(DevelopmentLogger_1.DevLogEvent.EnvFileLoaded, name_1);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (environmentLocalsPaths_1_1 && !environmentLocalsPaths_1_1.done && (_a = environmentLocalsPaths_1.return)) _a.call(environmentLocalsPaths_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.loadEnvironment = loadEnvironment;
