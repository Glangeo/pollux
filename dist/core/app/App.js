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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var merge_1 = __importDefault(require("lodash/merge"));
var local_utils_1 = require("../../local-utils");
var DEFAULT_PORT = 3000;
var App = /** @class */ (function () {
    function App(options) {
        if (options === void 0) { options = {}; }
        var _a;
        this.options = options;
        if (this.options.logging) {
            local_utils_1.DevelopmentLogger.configuration = merge_1.default(__assign({}, local_utils_1.DevelopmentLogger.configuration), this.options.logging);
        }
        this.route = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.baseRoute) || '/';
        this.server = express_1.default();
    }
    App.prototype.init = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.beforeInit()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.applyMiddleware()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.enableModules()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.afterInit()];
                    case 4:
                        _a.sent();
                        if (callback) {
                            callback();
                        }
                        return [2 /*return*/, this];
                }
            });
        });
    };
    App.prototype.listen = function (callback) {
        var port = this.options.port || DEFAULT_PORT;
        this.server.listen(port, callback ? function () { return callback(port); } : undefined);
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
    App.prototype.addModule = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!module.init) return [3 /*break*/, 2];
                        return [4 /*yield*/, module.init()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (module.router) {
                            this.server.use(this.route, module.router.getExpressRouter());
                        }
                        local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.AppModuleAdded, module.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.applyMiddleware = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.server.use(body_parser_1.default.json());
                return [2 /*return*/];
            });
        });
    };
    return App;
}());
exports.App = App;