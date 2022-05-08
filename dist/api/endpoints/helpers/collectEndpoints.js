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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
/**
 * Collects endpoints from their files inside specified folder
 *
 * @param dirname path to folder where endpoints are stored
 * @returns array of collected from folder endpoints
 */
function collectEndpoints(dirname) {
    var endpointsFolderPath = path_1.default.resolve(dirname, 'endpoints');
    var paths = fs_1.default.readdirSync(endpointsFolderPath);
    var configurations = configureEndpointsByPaths(endpointsFolderPath, paths, []);
    var endpoints = configurations.map(function (configuration) { return (__assign(__assign({}, configuration.endpoint), { route: configuration.path.join('/') })); });
    return endpoints;
}
exports.collectEndpoints = collectEndpoints;
function configureEndpointsByPaths(absoluteBasePath, relativePaths, components) {
    var e_1, _a;
    var configurations = [];
    try {
        for (var relativePaths_1 = __values(relativePaths), relativePaths_1_1 = relativePaths_1.next(); !relativePaths_1_1.done; relativePaths_1_1 = relativePaths_1.next()) {
            var path = relativePaths_1_1.value;
            var absolutePath = path_1.default.resolve(absoluteBasePath, path);
            var isFile = fs_1.default.lstatSync(absolutePath).isFile();
            if (isFile) {
                var module_1 = require(absolutePath);
                if (module_1.default) {
                    var configuration = {
                        path: __spread(components, [path.replace(/\.ts/g, '')]),
                        endpoint: module_1.default,
                    };
                    configurations.push(configuration);
                }
                else {
                    throw new Error('Endpoint file must have a default export');
                }
            }
            else {
                configurations.push.apply(configurations, __spread(configureEndpointsByPaths(path_1.default.resolve(absoluteBasePath, path), fs_1.default.readdirSync(absolutePath), __spread(components, [path]))));
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
