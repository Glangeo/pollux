"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionPipe = void 0;
var ExceptionPipe = /** @class */ (function () {
    function ExceptionPipe(consumer) {
        this.consumer = consumer;
        this.filters = [];
    }
    ExceptionPipe.prototype.addFilter = function (filter) {
        this.filters.push(filter);
        return this;
    };
    ExceptionPipe.prototype.execute = function (exception) {
        var isFit = this.filters.every(function (filter) { return filter.predicate(exception); });
        if (isFit) {
            var result = this.consumer(exception);
            if (result instanceof Promise) {
                return result;
            }
        }
    };
    return ExceptionPipe;
}());
exports.ExceptionPipe = ExceptionPipe;
