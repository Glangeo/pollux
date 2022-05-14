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
        var e_1, _a;
        this.config = config;
        var _b = this.config, currentAppName = _b.currentAppName, apps = _b.apps;
        var currentAppConfig = apps.find(function (_a) {
            var name = _a.name;
            return name === currentAppName;
        });
        if (!currentAppConfig) {
            throw new Error("Current app is not found in configuration!");
        }
        this.currentApp = this.getCurrentApp(currentAppConfig);
        try {
            for (var apps_1 = __values(apps), apps_1_1 = apps_1.next(); !apps_1_1.done; apps_1_1 = apps_1.next()) {
                var config_1 = apps_1_1.value;
                var isDetached = config_1.name !== currentAppName;
                if (isDetached) {
                    this.initDetachedServices(config_1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (apps_1_1 && !apps_1_1.done && (_a = apps_1.return)) _a.call(apps_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    DistributedStartup.prototype.init = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this.currentApp).init.apply(_a, __spreadArray([], __read(args), false));
    };
    DistributedStartup.prototype.getCurrentApp = function (appConfig) {
        var e_2, _a, e_3, _b, e_4, _c;
        var app = appConfig.app, port = appConfig.port, _d = appConfig.childApps, childApps = _d === void 0 ? [] : _d;
        var services = new Set();
        var addServiceToRegistry = function (service) {
            if (!services.has(service)) {
                services.add(service);
                var instance = new service();
                ServiceRegistry_1.ServiceRegistry.setService(service, instance);
            }
        };
        try {
            for (var _e = __values(app.services), _f = _e.next(); !_f.done; _f = _e.next()) {
                var service = _f.value;
                addServiceToRegistry(service);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var childApps_1 = __values(childApps), childApps_1_1 = childApps_1.next(); !childApps_1_1.done; childApps_1_1 = childApps_1.next()) {
                var child = childApps_1_1.value;
                try {
                    for (var _g = (e_4 = void 0, __values(child.services)), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var service = _h.value;
                        addServiceToRegistry(service);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                app.addChildAppToQueue(child, child.options.baseRoute || child.name);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (childApps_1_1 && !childApps_1_1.done && (_b = childApps_1.return)) _b.call(childApps_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var remoteCallModule = (0, helpers_1.createRemoteCallModule)(Array.from(services.values()));
        app.addModuleToQueue(remoteCallModule);
        app.options.port = port;
        return app;
    };
    DistributedStartup.prototype.initDetachedServices = function (appConfig) {
        var e_5, _a;
        var _this = this;
        var app = appConfig.app, host = appConfig.host, _b = appConfig.childApps, childApps = _b === void 0 ? [] : _b;
        var services = new Set();
        var fillServiceRegistryWithEmittersByApp = function (app) {
            var e_6, _a;
            try {
                for (var _b = __values(app.services), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var service = _c.value;
                    if (services.has(service)) {
                        throw new Error("".concat(service.name, " was already added to registry by other application. Multiple instances of the same service are not allowed."));
                    }
                    var emitter = (0, helpers_1.getRequestEmitter)(service, function (request) { return __awaiter(_this, void 0, void 0, function () {
                        var detachedRouterRoute, axios, response, data, result, service_1, method, error_1, exception;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    detachedRouterRoute = '/detached';
                                    axios = new axios_1.Axios({
                                        baseURL: (0, local_utils_1.fixUrl)([
                                            host,
                                            app.options.baseRoute || app.name,
                                            detachedRouterRoute,
                                        ].join('/')),
                                    });
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, axios.post('/call', JSON.stringify(request), {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        })];
                                case 2:
                                    response = _a.sent();
                                    data = JSON.parse(response.data).data;
                                    result = data.result, service_1 = data.service, method = data.method;
                                    local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.DistributedRemoteCallResponded, "from ".concat(host, " after call ").concat(service_1, ".").concat(method));
                                    return [2 /*return*/, { result: result, service: service_1, method: method }];
                                case 3:
                                    error_1 = _a.sent();
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
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        fillServiceRegistryWithEmittersByApp(app);
        try {
            for (var childApps_2 = __values(childApps), childApps_2_1 = childApps_2.next(); !childApps_2_1.done; childApps_2_1 = childApps_2.next()) {
                var child = childApps_2_1.value;
                fillServiceRegistryWithEmittersByApp(child);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (childApps_2_1 && !childApps_2_1.done && (_a = childApps_2.return)) _a.call(childApps_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    return DistributedStartup;
}());
exports.DistributedStartup = DistributedStartup;
