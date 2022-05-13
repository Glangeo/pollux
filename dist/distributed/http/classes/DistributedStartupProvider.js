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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributedStartupProvider = void 0;
var helpers_1 = require("../helpers");
var ServiceRegistry_1 = require("./ServiceRegistry");
var DistributedStartupProvider = /** @class */ (function () {
    function DistributedStartupProvider(appClass, current, config, services) {
        var e_1, _a, e_2, _b;
        var _this = this;
        this.appClass = appClass;
        this.current = current;
        this.config = config;
        this.services = services;
        if (this.isCurrentServiceMissing()) {
            throw new Error("Current service (".concat(this.current.name, ") is missing in configuration!"));
        }
        ServiceRegistry_1.ServiceRegistry.setCurrentServiceName(this.current.name);
        var _c = this.config, combined = _c.combined, detached = _c.detached;
        var _loop_1 = function (serviceName) {
            var constructor = this_1.services.find(function (service) { return service.name === serviceName; });
            if (!constructor) {
                throw new Error("Could not find ".concat(serviceName, " constructor!"));
            }
            ServiceRegistry_1.ServiceRegistry.setService(constructor, new constructor());
        };
        var this_1 = this;
        try {
            for (var _d = __values(combined.services), _e = _d.next(); !_e.done; _e = _d.next()) {
                var serviceName = _e.value;
                _loop_1(serviceName);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_2 = function (name_1, url) {
            var constructor = this_2.services.find(function (service) { return service.name === name_1; });
            if (!constructor) {
                throw new Error("Could not find ".concat(name_1, " constructor!"));
            }
            ServiceRegistry_1.ServiceRegistry.setService(constructor, (0, helpers_1.getRequestEmitter)(constructor, function (request) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // TODO: send request some where
                    // eslint-disable-next-line no-console
                    console.log("EMIT FOR ".concat(constructor.name, " WITH REQUEST: "), request, " TO URL: ".concat(url));
                    return [2 /*return*/, undefined];
                });
            }); }));
        };
        var this_2 = this;
        try {
            for (var detached_1 = __values(detached), detached_1_1 = detached_1.next(); !detached_1_1.done; detached_1_1 = detached_1.next()) {
                var _f = detached_1_1.value, name_1 = _f.name, url = _f.url;
                _loop_2(name_1, url);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (detached_1_1 && !detached_1_1.done && (_b = detached_1.return)) _b.call(detached_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    DistributedStartupProvider.prototype.getCurrentApp = function () {
        var app = new this.appClass(this.current.options.app);
        return app;
    };
    DistributedStartupProvider.prototype.isCurrentServiceMissing = function () {
        var name = this.current.name;
        var isInCombinedApp = this.config.combined.services.includes(name);
        var isDetachedService = this.config.detached.find(function (service) { return service.name === name; });
        return !(isInCombinedApp || isDetachedService);
    };
    return DistributedStartupProvider;
}());
exports.DistributedStartupProvider = DistributedStartupProvider;
