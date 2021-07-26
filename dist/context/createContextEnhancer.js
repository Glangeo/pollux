"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextEnhancer = void 0;
function createContextEnhancer() {
    return {
        setState: function (state, context) {
            context.state.extendableState = state;
        },
        getState: function (context) {
            return context.state.extendableState;
        },
    };
}
exports.createContextEnhancer = createContextEnhancer;
