"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvironment = void 0;
var path_1 = __importDefault(require("path"));
var config_1 = require("../config");
var loadEnvFile_1 = require("./loadEnvFile");
function loadEnvironment(isDebugMode) {
    if (isDebugMode === void 0) { isDebugMode = false; }
    loadEnvFile_1.loadEnvFile(path_1.default.join(process.cwd(), '.env.local'), isDebugMode);
    if (config_1.Config.isDev()) {
        loadEnvFile_1.loadEnvFile(path_1.default.join(process.cwd(), '.env.development'), isDebugMode);
    }
    else {
        loadEnvFile_1.loadEnvFile(path_1.default.join(process.cwd(), '.env.production'), isDebugMode);
    }
}
exports.loadEnvironment = loadEnvironment;
