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
                var key = value.key, factory = value.factory, _d = value.isMemoized, isMemoized = _d === void 0 ? true : _d;
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
        return function () { return factory(registry); };
    };
    RegistryBuilder.prototype.GET_MEMOIZED_REGISTRY_METHOD = function (key, registry, factory) {
        return function () {
            var memoizedKey = "__memoized_".concat(key);
            if (!registry[memoizedKey]) {
                registry[memoizedKey] = factory(registry);
            }
            return registry[memoizedKey];
        };
    };
    return RegistryBuilder;
}());
exports.RegistryBuilder = RegistryBuilder;
