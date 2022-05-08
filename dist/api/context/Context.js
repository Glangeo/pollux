"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
/**
 * Context is used to transfer data from middlewares and router to endpoint handler
 */
var Context = /** @class */ (function () {
    function Context(initialState) {
        this.defaultState = {};
        this.state = Object.assign({}, this.defaultState, initialState);
    }
    return Context;
}());
exports.Context = Context;
