"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContext = void 0;
var helpers_1 = require("../helpers");
/**
 * Default middleware for context usage
 *
 * @returns
 */
var useContext = function () { return function (req, res, next) {
    helpers_1.setContext(helpers_1.getContext(req, res), res);
    next();
}; };
exports.useContext = useContext;
