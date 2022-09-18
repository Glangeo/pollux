"use strict";
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
exports.RegistryBuilder = void 0;
var RegistryBuilder = /** @class */ (function () {
    function RegistryBuilder() {
        this.config = {};
    }
    RegistryBuilder.prototype.addMethod = function (config) {
        var key = config.key;
        this.config[key] = config;
        return this;
    };
    RegistryBuilder.prototype.build = function () {
        var e_1, _a;
        var registry = {};
        try {
            for (var _b = __values(Object.values(this.config)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                var _d = value, key = _d.key, factory = _d.factory, _e = _d.isMemoized, isMemoized = _e === void 0 ? true : _e;
                registry[key] = isMemoized
                    ? this.GET_MEMOIZED_REGISTRY_METHOD(key, registry, factory)
                    : this.GET_DEFAULT_REGISTRY_METHOD(registry, factory);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return registry;
    };
    RegistryBuilder.prototype.GET_DEFAULT_REGISTRY_METHOD = function (registry, factory) {
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return factory.apply(void 0, __spreadArray([registry], __read(params), false));
        };
    };
    RegistryBuilder.prototype.GET_MEMOIZED_REGISTRY_METHOD = function (key, registry, factory) {
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var memoizedKey = "__memoized_".concat(key);
            if (!registry[memoizedKey]) {
                registry[memoizedKey] = factory.apply(void 0, __spreadArray([registry], __read(params), false));
            }
            return registry[memoizedKey];
        };
    };
    return RegistryBuilder;
}());
exports.RegistryBuilder = RegistryBuilder;
