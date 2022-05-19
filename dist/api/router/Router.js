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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var express_1 = __importDefault(require("express"));
var exception_1 = require("../../core/exception");
var helpers_1 = require("../../core/exception/helpers");
var prebuild_1 = require("../../core/exception/prebuild");
var local_utils_1 = require("../../local-utils");
var common_1 = require("../common");
var endpoints_1 = require("../endpoints");
var helpers_2 = require("../response/helpers");
var validator_1 = require("../validator");
var getRouterDefaultExceptionHandler_1 = require("./helpers/getRouterDefaultExceptionHandler");
/**
 * Adds each endpoint to express.Router, adds validations mechanism and wraps every request with exception handler
 */
var Router = /** @class */ (function () {
    function Router(config) {
        this.config = __assign(__assign({}, Router.DEFAULT_CONFIG), config);
    }
    /**
     * Adds all endpoints with validations and exception handling wrapper to newly created express router
     *
     * @returns configurated express router instance
     */
    Router.prototype.getExpressRouter = function () {
        var e_1, _a;
        var router = express_1.default.Router();
        try {
            for (var _b = __values(this.config.endpoints), _c = _b.next(); !_c.done; _c = _b.next()) {
                var endpoint = _c.value;
                if (!endpoint.route) {
                    local_utils_1.DevelopmentLogger.WARN('endpoint.route was not provided!');
                    continue;
                }
                var method = undefined;
                switch (endpoint.method) {
                    case endpoints_1.EndpointMethod.GET:
                        method = router.get.bind(router);
                        break;
                    case endpoints_1.EndpointMethod.POST:
                        method = router.post.bind(router);
                        break;
                    case endpoints_1.EndpointMethod.PUT:
                        method = router.put.bind(router);
                        break;
                    default:
                        break;
                }
                var path = (0, local_utils_1.fixUrl)("".concat(this.config.path, "/").concat(endpoint.route));
                if (method) {
                    var middlewares = endpoint.middlewares || [];
                    method.apply(void 0, __spreadArray(__spreadArray([path,
                        this.getExceptionHandlerMiddleware(endpoint)], __read(middlewares), false), [this.createRequestHandler(endpoint)], false));
                    local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.RouterRouteAdded, "Add route: ".concat(endpoint.method, " ").concat(path));
                }
                else {
                    local_utils_1.DevelopmentLogger.WARN("[WARNING] route ".concat(endpoint.method, " ").concat(path, " could not be added! Requested method is not supported. Currenlty supported methods: GET, POST, PUT"));
                }
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
    Router.prototype.createRequestHandler = function (endpoint) {
        var _this = this;
        return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var requestData, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tryGetRequestData(endpoint, req)];
                    case 1:
                        requestData = _a.sent();
                        return [4 /*yield*/, endpoint.action(requestData, req, res)];
                    case 2:
                        result = _a.sent();
                        if (!res.headersSent) {
                            response = (0, helpers_2.createSuccessResponse)(result);
                            res.status(common_1.HTTPStatusCode.Ok).json(response);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    };
    Router.prototype.getExceptionHandlerMiddleware = function (endpoint) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var error_1, exception, handler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        return [2 /*return*/, next()];
                    case 1:
                        error_1 = _a.sent();
                        exception = error_1 instanceof exception_1.Exception
                            ? error_1
                            : (0, helpers_1.castUnknownErrorToException)(error_1);
                        handler = this.config.getRouterExceptionHandler(req, res, endpoint);
                        return [4 /*yield*/, handler.handle(exception)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    Router.prototype.tryGetRequestData = function (endpoint, req) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var requestData, partials, partials_1, partials_1_1, _d, name_1, schema, validated, e_2_1;
            var e_2, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        requestData = {};
                        partials = [
                            {
                                name: 'query',
                                schema: (_a = endpoint.validation) === null || _a === void 0 ? void 0 : _a.query,
                            },
                            {
                                name: 'params',
                                schema: (_b = endpoint.validation) === null || _b === void 0 ? void 0 : _b.params,
                            },
                            {
                                name: 'body',
                                schema: (0, endpoints_1.isEndpointWithBody)(endpoint)
                                    ? (_c = endpoint.validation) === null || _c === void 0 ? void 0 : _c.body
                                    : undefined,
                            },
                        ];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 8]);
                        partials_1 = __values(partials), partials_1_1 = partials_1.next();
                        _f.label = 2;
                    case 2:
                        if (!!partials_1_1.done) return [3 /*break*/, 5];
                        _d = partials_1_1.value, name_1 = _d.name, schema = _d.schema;
                        if (!schema) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.config.validate(schema, req[name_1], name_1 === 'body')];
                    case 3:
                        validated = _f.sent();
                        if (!validated.isValid) {
                            throw new prebuild_1.ValidationException({
                                message: "Request data for ".concat(name_1, " failed."),
                                meta: {
                                    errors: validated.errors,
                                },
                                publicInfo: {
                                    message: "Request data for ".concat(name_1, " failed."),
                                },
                            });
                        }
                        requestData[name_1] = validated.data;
                        _f.label = 4;
                    case 4:
                        partials_1_1 = partials_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _f.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (partials_1_1 && !partials_1_1.done && (_e = partials_1.return)) _e.call(partials_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, requestData];
                }
            });
        });
    };
    Router.DEFAULT_CONFIG = {
        endpoints: [],
        path: '',
        validate: validator_1.validate,
        getRouterExceptionHandler: getRouterDefaultExceptionHandler_1.getRouterDefaultExceptionHandler,
    };
    return Router;
}());
exports.Router = Router;
