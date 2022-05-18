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
exports.createRegistry = void 0;
function createRegistry(config) {
    var e_1, _a;
    var registry = {};
    var _loop_1 = function (key) {
        var _d = config[key], factory = _d.factory, _e = _d.isMemoized, isMemoized = _e === void 0 ? true : _e;
        if (isMemoized) {
            var memoizedResultKey_1 = getMemoizedResultKey(key);
            registry[key] = function () {
                if (!registry[memoizedResultKey_1]) {
                    registry[memoizedResultKey_1] = factory();
                }
                return registry[memoizedResultKey_1];
            };
        }
        else {
            registry[key] = factory;
        }
    };
    try {
        for (var _b = __values(Object.keys(config)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            _loop_1(key);
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
}
exports.createRegistry = createRegistry;
function getMemoizedResultKey(key) {
    return "__memoized_".concat(key);
}
