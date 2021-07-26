"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setContext = void 0;
function setContext(context, res) {
    res.locals.context = context;
}
exports.setContext = setContext;
