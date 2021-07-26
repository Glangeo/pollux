"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var Context = /** @class */ (function () {
    function Context(initialState) {
        this.defaultState = {};
        this.state = Object.assign({}, this.defaultState, initialState || {});
    }
    return Context;
}());
exports.Context = Context;
