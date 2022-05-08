"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvFile = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
/**
 * Loads environment file
 *
 * @param filePath path to environment file
 * @param isDebugMode should enable logging
 */
function loadEnvFile(filePath, isDebugMode) {
    var options = {
        path: filePath,
    };
    if (isDebugMode) {
        options.debug = true;
    }
    dotenv_1.default.config(options);
}
exports.loadEnvFile = loadEnvFile;
