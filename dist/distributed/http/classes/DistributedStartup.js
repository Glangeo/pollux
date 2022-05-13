"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributedStartup = void 0;
var axios_1 = require("axios");
var core_1 = require("../../../core");
var local_utils_1 = require("../../../local-utils");
var helpers_1 = require("../helpers");
var ServiceRegistry_1 = require("./ServiceRegistry");
var DistributedStartup = /** @class */ (function () {
    function DistributedStartup(config) {
        this.config = config;
    }
    DistributedStartup.prototype.init = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentAppName, apps, currentAppConfig, app, apps_1, apps_1_1, app_1, isDetached;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.config, currentAppName = _a.currentAppName, apps = _a.apps;
                        currentAppConfig = apps.find(function (_a) {
                            var name = _a.name;
                            return name === currentAppName;
                        });
                        if (!currentAppConfig) {
                            throw new Error("Current app is not found in configuration!");
                        }
                        return [4 /*yield*/, this.getCurrentApp(currentAppConfig)];
                    case 1:
                        app = _c.sent();
                        try {
                            for (apps_1 = __values(apps), apps_1_1 = apps_1.next(); !apps_1_1.done; apps_1_1 = apps_1.next()) {
                                app_1 = apps_1_1.value;
                                isDetached = app_1.name !== currentAppName;
                                if (isDetached) {
                                    this.initDetachedServices(app_1);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (apps_1_1 && !apps_1_1.done && (_b = apps_1.return)) _b.call(apps_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, app.init.apply(app, __spreadArray([], __read(args), false))];
                }
            });
        });
    };
    DistributedStartup.prototype.getCurrentApp = function (appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var app, port, services, services_1, services_1_1, constructor, instance, serviceApp, remoteCallModule, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        app = appConfig.app, port = appConfig.port, services = appConfig.services;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        services_1 = __values(services), services_1_1 = services_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!services_1_1.done) return [3 /*break*/, 6];
                        constructor = services_1_1.value;
                        instance = new constructor();
                        ServiceRegistry_1.ServiceRegistry.setService(constructor, instance);
                        serviceApp = instance.getApp();
                        remoteCallModule = (0, helpers_1.createRemoteCallModule)(services);
                        return [4 /*yield*/, serviceApp.addModule(remoteCallModule)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, app.addChildApp(serviceApp, serviceApp.options.baseRoute || constructor.name.toLowerCase())];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        services_1_1 = services_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (services_1_1 && !services_1_1.done && (_a = services_1.return)) _a.call(services_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        app.options.port = port;
                        return [2 /*return*/, app];
                }
            });
        });
    };
    DistributedStartup.prototype.initDetachedServices = function (appConfig) {
        var e_3, _a;
        var _this = this;
        var app = appConfig.app, host = appConfig.host, services = appConfig.services;
        try {
            for (var services_2 = __values(services), services_2_1 = services_2.next(); !services_2_1.done; services_2_1 = services_2.next()) {
                var service = services_2_1.value;
                var emitter = (0, helpers_1.getRequestEmitter)(service, function (request) { return __awaiter(_this, void 0, void 0, function () {
                    var detachedRouterRoute, axios, response, _a, service_1, method, error_1, exception;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                detachedRouterRoute = '/detached';
                                axios = new axios_1.Axios({
                                    baseURL: (0, local_utils_1.fixUrl)([host, app.options.baseRoute || '', detachedRouterRoute].join('/')),
                                });
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, axios.post('/call', request)];
                            case 2:
                                response = _b.sent();
                                _a = response.data, service_1 = _a.service, method = _a.method;
                                local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.DistributedRemoteCallResponded, "from ".concat(host, " after call ").concat(service_1, ".").concat(method));
                                return [2 /*return*/, response.data];
                            case 3:
                                error_1 = _b.sent();
                                exception = (0, core_1.castUnknownErrorToException)(error_1);
                                throw exception;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                ServiceRegistry_1.ServiceRegistry.setService(service, emitter);
                local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.DistributedDetachedServiceAdded, service.name);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (services_2_1 && !services_2_1.done && (_a = services_2.return)) _a.call(services_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    return DistributedStartup;
}());
exports.DistributedStartup = DistributedStartup;
