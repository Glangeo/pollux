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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectEndpoints = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var local_utils_1 = require("../../../local-utils");
/**
 * Collects endpoints from their files inside specified folder
 *
 * @param dirname path to folder where endpoints folder is placed
 * @param [folderName] folder name where endpoints are places
 * @returns array of collected from folder endpoints
 */
function collectEndpoints(dirname, folderName, endpointRegExp) {
    if (folderName === void 0) { folderName = 'endpoints'; }
    if (endpointRegExp === void 0) { endpointRegExp = /.*\.ts$/g; }
    var endpointsFolderPath = path_1.default.resolve(dirname, folderName);
    var paths = fs_1.default.readdirSync(endpointsFolderPath);
    var configurations = configureEndpointsByPaths(endpointsFolderPath, paths, [], endpointRegExp);
    var endpoints = configurations
        .sort(confiurationsComparator)
        .map(function (configuration) { return (__assign(__assign({}, configuration.endpoint), { route: (0, local_utils_1.fixUrl)(configuration.path.join('/')) })); });
    return endpoints;
}
exports.collectEndpoints = collectEndpoints;
function configureEndpointsByPaths(absoluteBasePath, relativePaths, components, endpointRegExp) {
    var e_1, _a, e_2, _b;
    var configurations = [];
    try {
        for (var relativePaths_1 = __values(relativePaths), relativePaths_1_1 = relativePaths_1.next(); !relativePaths_1_1.done; relativePaths_1_1 = relativePaths_1.next()) {
            var path = relativePaths_1_1.value;
            var absolutePath = path_1.default.resolve(absoluteBasePath, path);
            var isFile = fs_1.default.lstatSync(absolutePath).isFile();
            if (isFile) {
                var isEndpoint = Boolean(absolutePath.match(endpointRegExp));
                if (isEndpoint) {
                    var module_1 = require(absolutePath);
                    if (module_1.default) {
                        var route = castFolderOrFileNameToRoute(path);
                        var endpoints = Array.isArray(module_1.default)
                            ? module_1.default
                            : [module_1.default];
                        checkIfEndpointsOfSameRouteHasDifferentMethods(endpoints, path);
                        try {
                            for (var endpoints_1 = (e_2 = void 0, __values(endpoints)), endpoints_1_1 = endpoints_1.next(); !endpoints_1_1.done; endpoints_1_1 = endpoints_1.next()) {
                                var endpoint = endpoints_1_1.value;
                                var configuration = {
                                    endpoint: endpoint,
                                    path: __spreadArray(__spreadArray([], __read(components), false), [route], false),
                                };
                                configurations.push(configuration);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (endpoints_1_1 && !endpoints_1_1.done && (_b = endpoints_1.return)) _b.call(endpoints_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                else {
                    throw new Error("Endpoint file must have a default export. Endpoint file path: ".concat(absolutePath));
                }
            }
            else {
                var route = castFolderOrFileNameToRoute(path);
                configurations.push.apply(configurations, __spreadArray([], __read(configureEndpointsByPaths(path_1.default.resolve(absoluteBasePath, path), fs_1.default.readdirSync(absolutePath), __spreadArray(__spreadArray([], __read(components), false), [route], false), endpointRegExp)), false));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (relativePaths_1_1 && !relativePaths_1_1.done && (_a = relativePaths_1.return)) _a.call(relativePaths_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return configurations;
}
function castFolderOrFileNameToRoute(name) {
    if (name === 'index.ts') {
        return '/';
    }
    if (name.includes('[')) {
        var fromIndex = name.indexOf('[');
        var toIndex = name.indexOf(']');
        var param = name.substring(fromIndex + 1, toIndex);
        return ":".concat(param);
    }
    return name.replace(/\.ts/g, '');
}
function confiurationsComparator(a, b) {
    if (a.path.length !== b.path.length) {
        return a.path.length - b.path.length;
    }
    var getIndexOfFirstDynamicComponent = function (path) {
        return path.findIndex(function (component) { return component.includes(':'); });
    };
    var pathA = __spreadArray([], __read(a.path), false);
    var pathB = __spreadArray([], __read(b.path), false);
    var indexInA = getIndexOfFirstDynamicComponent(pathA);
    var indexInB = getIndexOfFirstDynamicComponent(pathB);
    while (indexInA === indexInB) {
        if (indexInA === -1 && indexInB === -1) {
            return (
            // TODO: fix order
            a.path[a.path.length - 1].length - b.path[b.path.length - 1].length);
        }
        pathA.splice(0, indexInA + 1);
        pathB.splice(0, indexInB + 1);
        indexInA = getIndexOfFirstDynamicComponent(pathA);
        indexInB = getIndexOfFirstDynamicComponent(pathB);
    }
    return indexInA - indexInB;
}
function checkIfEndpointsOfSameRouteHasDifferentMethods(endpoints, path) {
    var set = new Set();
    endpoints.forEach(function (endpoint) {
        if (set.has(endpoint.method)) {
            throw new Error("Could not add multiple endpoints with same method and route.\nPath: ".concat(path));
        }
        set.add(endpoint.method);
    });
}
