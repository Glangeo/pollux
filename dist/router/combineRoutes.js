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
exports.combineRoutes = void 0;
function combineRoutes(routes, options) {
    if (options === void 0) { options = {}; }
    var pathPrefix = options.pathPrefix;
    return routes.map(function (route) { return (__assign(__assign({}, route), { path: pathPrefix ? concatinatePathes([pathPrefix, route.path]) : route.path })); });
}
exports.combineRoutes = combineRoutes;
function concatinatePathes(pathes) {
    var path = pathes
        .join('/')
        .replace(/\/\/+/g, '/')
        .replace(/\/$/, '')
        .replace(/^\/*/, '/');
    return path;
}
