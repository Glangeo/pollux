"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupEndpoints = void 0;
var local_utils_1 = require("../../../local-utils");
/**
 * Groups given array of endpoints into a group. Commonly used for grouping endpoints with same route prefix
 *
 * @param endpoints array of endpoints to group
 * @param options grouping options
 * @returns
 */
function groupEndpoints(endpoints, options) {
    if (options === void 0) { options = {}; }
    var routePrefix = options.routePrefix;
    if (routePrefix) {
        return endpoints
            .map(function (endpoint) {
            if (endpoint.route) {
                return __assign(__assign({}, endpoint), { route: concatinatePaths([routePrefix, endpoint.route]) });
            }
            var stack = new Error().stack;
            local_utils_1.DevelopmentLogger.WARN("groupEndpoints: endpoint skipped cause of lack of route property." + (stack ? "\n" + stack : ''));
            return null;
        })
            .filter(Boolean);
    }
    return endpoints;
}
exports.groupEndpoints = groupEndpoints;
function concatinatePaths(pathes) {
    var path = pathes
        .join('/')
        .replace(/\/\/+/g, '/')
        .replace(/\/$/, '')
        .replace(/^\/*/, '/');
    return path;
}
