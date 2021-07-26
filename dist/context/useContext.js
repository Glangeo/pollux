"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContext = void 0;
var Context_1 = require("./Context");
var setContext_1 = require("./setContext");
var useContext = function () { return function (req, res, next) {
    var context = new Context_1.Context({
        route: req.path,
        params: req.params,
        queryParams: req.query,
        extendableState: {},
    });
    setContext_1.setContext(context, res);
    next();
}; };
exports.useContext = useContext;
