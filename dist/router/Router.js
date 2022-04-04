"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var express_1 = __importDefault(require("express"));
var utils_1 = require("src/utils");
var PublicExceptionKey_1 = require("../exception/PublicExceptionKey");
var config_1 = require("../config");
var context_1 = require("../context");
var exception_1 = require("../exception");
var validator_1 = require("../validator");
/**
 * Request handling mechanism
 *
 * @todo Add support for different Http.Method in routes
 * @todo Move exception handling mechanism outside
 * @todo Add file-based routing system support
 */
var Router = /** @class */ (function () {
    function Router(config) {
        this.config = config;
    }
    Router.prototype.getExpressRouter = function () {
        var e_1, _a;
        var router = express_1.default.Router();
        try {
            for (var _b = __values(this.config.routes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rawRoute = _c.value;
                var route = typeof rawRoute === 'function' ? rawRoute() : rawRoute;
                var path = this.getRoutePath(route.path, route.isPrefixedByBaseRoute);
                var middleware = route.middleware || this.config.defaultMiddleware || [];
                router.post.apply(router, __spread([path], middleware, [Router.getRequestHandler(route)]));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return router;
    };
    Router.prototype.getRoutePath = function (path, isPrefixedByBaseRoute) {
        if (isPrefixedByBaseRoute === void 0) { isPrefixedByBaseRoute = true; }
        if (isPrefixedByBaseRoute) {
            var prefixedPath = (this.config.basePath + "/" + path)
                .replace(/\/\/+/g, '/')
                .replace(/\/$/, '')
                .replace(/^\/*/, '/');
            return prefixedPath;
        }
        return path.replace(/\/$/, '').replace(/^\/*/, '/');
    };
    Router.getRequestHandler = function (route) {
        return function (req, res) { return Router.callRouteAction(req, res, route); };
    };
    Router.callRouteAction = function (req, res, route) {
        return __awaiter(this, void 0, void 0, function () {
            var context, request, rawForm, validationResult, _a, extendableState, rest, exception, form, result, data, _b, response, exception_2, response, _c, extendableState, rest, exceptionInstance, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        context = context_1.getContext(res);
                        request = {
                            route: context.state.route,
                            params: context.state.params,
                            query: context.state.queryParams,
                            body: req.body,
                        };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, , 8]);
                        rawForm = req.body;
                        return [4 /*yield*/, new validator_1.Validator(rawForm, route.schema).validate()];
                    case 2:
                        validationResult = _d.sent();
                        if (validationResult.errors) {
                            _a = context.state, extendableState = _a.extendableState, rest = __rest(_a, ["extendableState"]);
                            exception = new exception_1.ValidationException(context.state.route, validationResult.errors.map(function (error) { return error.message; }), {
                                key: PublicExceptionKey_1.PublicExceptionKey.VALIDATION,
                                details: [],
                            }, {
                                form: req.body,
                                contextState: rest,
                            });
                            throw exception;
                        }
                        form = validationResult.data;
                        return [4 /*yield*/, route.action(form, context)];
                    case 3:
                        result = _d.sent();
                        if (!route.decoration) return [3 /*break*/, 5];
                        return [4 /*yield*/, route.decoration(result, context)];
                    case 4:
                        _b = _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _b = result;
                        _d.label = 6;
                    case 6:
                        data = _b;
                        if (res.writableEnded) {
                            return [2 /*return*/];
                        }
                        response = {
                            status: 'success',
                            result: data,
                        };
                        utils_1.DevelopmentLogger.LOG(utils_1.DevLogEvent.RouterIncomingRequest, JSON.stringify({ request: request, response: response }, null, 2));
                        res.status(200).json(response);
                        return [3 /*break*/, 8];
                    case 7:
                        exception_2 = _d.sent();
                        if (exception_2 instanceof exception_1.Exception) {
                            response = {
                                status: 'error',
                                errors: config_1.Config.isDev() || config_1.Config.isTest()
                                    ? __assign(__assign({}, exception_2.getPublicPlainData()), exception_2.toPlainObject()) : exception_2.getPublicPlainData(),
                            };
                            utils_1.DevelopmentLogger.LOG(utils_1.DevLogEvent.RouterIncomingRequest, JSON.stringify({ request: request, response: response }, null, 2));
                            res.status(200).json(response);
                        }
                        else {
                            _c = context.state, extendableState = _c.extendableState, rest = __rest(_c, ["extendableState"]);
                            exceptionInstance = new exception_1.InternalException(context.state.route, [String(exception_2)], {
                                key: PublicExceptionKey_1.PublicExceptionKey.INTERNAL,
                                details: [],
                            }, {
                                contextState: rest,
                            });
                            if (config_1.Config.isDev()) {
                                // eslint-disable-next-line no-console
                                console.log(exception_2);
                            }
                            response = {
                                status: 'error',
                                errors: config_1.Config.isDev() || config_1.Config.isTest()
                                    ? exceptionInstance.toPlainObject()
                                    : exceptionInstance.getPublicPlainData(),
                            };
                            utils_1.DevelopmentLogger.LOG(utils_1.DevLogEvent.RouterIncomingRequest, JSON.stringify({ request: request, response: response }, null, 2));
                            res.json(response).send();
                        }
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
