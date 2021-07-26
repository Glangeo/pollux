"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = void 0;
function getContext(res) {
    var context = res.locals.context;
    if (!context) {
        throw new Error('E_CONTEXT_NOT_DEFINED');
    }
    return context;
}
exports.getContext = getContext;
