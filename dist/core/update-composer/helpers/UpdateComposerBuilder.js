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
exports.UpdateComposerBuilder = void 0;
var lodash_1 = require("lodash");
var UpdateComposerBuilder = /** @class */ (function () {
    function UpdateComposerBuilder() {
        this.map = {};
    }
    UpdateComposerBuilder.prototype.addSetter = function (key, setter) {
        if (setter === void 0) { setter = function (value) { return value; }; }
        this.map[key] = setter;
        return this;
    };
    UpdateComposerBuilder.prototype.build = function (onUpdate) {
        var e_1, _a;
        var _this = this;
        var composer = {
            changes: {},
        };
        // Create setters
        var getWrappedSetter = function (key) {
            var setter = _this.map[key];
            if (!setter) {
                throw new Error("Setter was not added for key: ".concat(key));
            }
            return function (value) {
                var nextValue = setter(value);
                if (nextValue instanceof Promise) {
                    return new Promise(function (resolve) {
                        nextValue.then(function (value) {
                            composer.changes[key] = value;
                            resolve(value);
                        });
                    });
                }
                composer.changes[key] = nextValue;
                return nextValue;
            };
        };
        try {
            for (var _b = __values(Object.keys(this.map)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                composer["set".concat((0, lodash_1.upperFirst)(key))] = getWrappedSetter(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        composer.set = function (key, value) { return getWrappedSetter(key)(value); };
        // Create update method
        composer.update = function () { return onUpdate(composer.changes); };
        return composer;
    };
    return UpdateComposerBuilder;
}());
exports.UpdateComposerBuilder = UpdateComposerBuilder;
