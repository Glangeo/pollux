"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvironment = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var config_1 = require("../config");
var DevelopmentLogger_1 = require("./DevelopmentLogger");
var loadEnvFile_1 = require("./loadEnvFile");
var ENV_LOCAL_FILENAME = '.env.local';
var ENV_DEV_FILENAME = '.env.development';
var ENV_PROD_FILENAME = '.env.production';
function loadEnvironment() {
    var getEnvPath = function (filename) { return path_1.default.join(process.cwd(), filename); };
    var localPath = getEnvPath(ENV_LOCAL_FILENAME);
    var devPath = getEnvPath(ENV_DEV_FILENAME);
    var prodPath = getEnvPath(ENV_PROD_FILENAME);
    if (fs_1.default.existsSync(localPath)) {
        loadEnvFile_1.loadEnvFile(localPath, false);
        DevelopmentLogger_1.DevelopmentLogger.LOG(DevelopmentLogger_1.DevLogEvent.EnvFileLoaded, ENV_LOCAL_FILENAME);
    }
    if (config_1.Config.isDev() && fs_1.default.existsSync(devPath)) {
        loadEnvFile_1.loadEnvFile(devPath, false);
        DevelopmentLogger_1.DevelopmentLogger.LOG(DevelopmentLogger_1.DevLogEvent.EnvFileLoaded, ENV_DEV_FILENAME);
    }
    if (!config_1.Config.isDev() && fs_1.default.existsSync(prodPath)) {
        loadEnvFile_1.loadEnvFile(prodPath, false);
        DevelopmentLogger_1.DevelopmentLogger.LOG(DevelopmentLogger_1.DevLogEvent.EnvFileLoaded, ENV_PROD_FILENAME);
    }
}
exports.loadEnvironment = loadEnvironment;
