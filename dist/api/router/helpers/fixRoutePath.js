"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixRoutePath = void 0;
/**
 * Removes extra slashes from route path
 *
 * @param path raw route path
 * @returns route path without extra slashes
 */
function fixRoutePath(path) {
    var result = path
        .replace(/\/\/+/g, '/')
        .replace(/\/$/, '')
        .replace(/^\/*/, '/');
    return result;
}
exports.fixRoutePath = fixRoutePath;
