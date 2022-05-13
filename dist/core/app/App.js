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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var merge_1 = __importDefault(require("lodash/merge"));
var local_utils_1 = require("../../local-utils");
var exception_1 = require("../exception");
var DEFAULT_PORT = 3000;
var App = /** @class */ (function () {
    function App(options, name) {
        if (options === void 0) { options = {}; }
        if (name === void 0) { name = 'Anonymous'; }
        this.options = options;
        this.name = name;
        this.childAppQueue = [];
        this._isInitied = false;
        if (this.options.logging) {
            local_utils_1.DevelopmentLogger.configuration = (0, merge_1.default)(__assign({}, local_utils_1.DevelopmentLogger.configuration), this.options.logging);
        }
        this.modulesQueue = [];
        this.childAppQueue = [];
        this.server = (0, express_1.default)();
    }
    App.prototype.init = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, module_1, e_1_1, _c, _d, _e, app, path, e_2_1;
            var e_1, _f, e_2, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.beforeInit()];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, this.applyMiddleware()];
                    case 2:
                        _h.sent();
                        return [4 /*yield*/, this.enableModules()];
                    case 3:
                        _h.sent();
                        _h.label = 4;
                    case 4:
                        _h.trys.push([4, 9, 10, 11]);
                        _a = __values(this.modulesQueue), _b = _a.next();
                        _h.label = 5;
                    case 5:
                        if (!!_b.done) return [3 /*break*/, 8];
                        module_1 = _b.value;
                        return [4 /*yield*/, this.addModule(module_1)];
                    case 6:
                        _h.sent();
                        _h.label = 7;
                    case 7:
                        _b = _a.next();
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11:
                        _h.trys.push([11, 16, 17, 18]);
                        _c = __values(this.childAppQueue), _d = _c.next();
                        _h.label = 12;
                    case 12:
                        if (!!_d.done) return [3 /*break*/, 15];
                        _e = __read(_d.value, 2), app = _e[0], path = _e[1];
                        return [4 /*yield*/, this.addChildApp(app, path)];
                    case 13:
                        _h.sent();
                        _h.label = 14;
                    case 14:
                        _d = _c.next();
                        return [3 /*break*/, 12];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 18];
                    case 17:
                        try {
                            if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 18: return [4 /*yield*/, this.afterInit()];
                    case 19:
                        _h.sent();
                        if (callback) {
                            callback();
                        }
                        this._isInitied = true;
                        local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.AppInit, this.name);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    App.prototype.listen = function (callback) {
        var port = this.options.port || DEFAULT_PORT;
        this.server.listen(port, callback ? function () { return callback(port); } : undefined);
    };
    App.prototype.enableModules = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    App.prototype.addModuleToQueue = function (module) {
        if (this.modulesQueue.includes(module)) {
            return;
        }
        this.modulesQueue.push(module);
    };
    App.prototype.addChildAppToQueue = function (app, path) {
        var isAppAlreadyAdded = this.childAppQueue.find(function (_a) {
            var _b = __read(_a, 1), _app = _b[0];
            return _app.name === app.name;
        });
        if (isAppAlreadyAdded) {
            return;
        }
        this.childAppQueue.push([app, path]);
    };
    App.prototype.addModule = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            var route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        route = this.options.baseRoute || '/';
                        if (!module.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, module.init()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (module.router) {
                            this.server.use(route, module.router.getExpressRouter());
                        }
                        local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.AppModuleAdded, module.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.addChildApp = function (app, path) {
        return __awaiter(this, void 0, void 0, function () {
            var appPath, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (app._isInitied) {
                            throw new exception_1.InternalException({
                                message: 'Could add already inited app as a child.',
                            });
                        }
                        app.options.baseRoute = undefined;
                        return [4 /*yield*/, app.init()];
                    case 1:
                        _a.sent();
                        appPath = [this.options.baseRoute];
                        if (path) {
                            appPath.push(path);
                        }
                        url = (0, local_utils_1.fixUrl)(appPath.join('/'));
                        this.server.use(url, app.server);
                        local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.AppChildAdded, "".concat(app.name, " on ").concat(url));
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.beforeInit = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    App.prototype.afterInit = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    App.prototype.applyMiddleware = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.server.use(body_parser_1.default.urlencoded({ extended: false }));
                this.server.use(body_parser_1.default.json());
                return [2 /*return*/];
            });
        });
    };
    return App;
}());
exports.App = App;
