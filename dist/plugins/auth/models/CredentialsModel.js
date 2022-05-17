"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModel = void 0;
var core_1 = require("../../../core");
var utils_1 = require("../../../utils");
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(dao, strategy) {
        this.dao = dao;
        this.strategy = strategy;
    }
    CredentialsModel.prototype.create = function (login, password, meta) {
        return __awaiter(this, void 0, void 0, function () {
            var isLoginUnique, salt, hashedPassword, credentials;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.throwsException)(function () { return _this.dao.getByLogin(login); }, core_1.NotFoundException)];
                    case 1:
                        isLoginUnique = _a.sent();
                        if (!isLoginUnique) {
                            throw new core_1.ValidationException({
                                message: 'Given login is already exist. Credentials.login must be unique.',
                                meta: {
                                    errors: [],
                                },
                                publicInfo: {
                                    message: 'Login is already exist. Try another one',
                                },
                            });
                        }
                        salt = this.strategy.getPasswordSalt();
                        hashedPassword = this.strategy.getPasswordHash(password, salt);
                        return [4 /*yield*/, this.dao.create(login, hashedPassword, salt, meta)];
                    case 2:
                        credentials = _a.sent();
                        return [2 /*return*/, credentials];
                }
            });
        });
    };
    CredentialsModel.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dao.getById(id)];
            });
        });
    };
    CredentialsModel.prototype.getByLogin = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dao.getByLogin(login)];
            });
        });
    };
    CredentialsModel.prototype.getRefreshToken = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, hashedPassword, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getByLogin(login)];
                    case 1:
                        credentials = _a.sent();
                        hashedPassword = this.strategy.getPasswordHash(password, credentials.salt);
                        if (hashedPassword !== credentials.hashedPassword) {
                            throw new core_1.ValidationException({
                                message: 'Password is invalid.',
                                meta: {
                                    errors: ['Password hashes are not match.'],
                                },
                                publicInfo: {
                                    message: 'Password is invalid.',
                                },
                            });
                        }
                        refreshToken = this.strategy.getRefreshToken(this, credentials);
                        return [2 /*return*/, refreshToken];
                }
            });
        });
    };
    CredentialsModel.prototype.getCredentialsByRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.strategy.getCredentialsByRefreshToken(this, token)];
            });
        });
    };
    CredentialsModel.prototype.updateCsrf = function (id, csrfToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dao.updateCsrf(id, csrfToken)];
            });
        });
    };
    return CredentialsModel;
}());
exports.CredentialsModel = CredentialsModel;
