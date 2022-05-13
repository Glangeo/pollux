"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemoteCallModule = void 0;
var Yup = __importStar(require("yup"));
var api_1 = require("../../../api");
var core_1 = require("../../../core");
var local_utils_1 = require("../../../local-utils");
var classes_1 = require("../classes");
var getRequestReceiver_1 = require("./getRequestReceiver");
function createRemoteCallModule(services) {
    var _this = this;
    var receivers = services.map(function (constructor) {
        return (0, getRequestReceiver_1.getRequestReceiver)(classes_1.ServiceRegistry.getService(constructor));
    });
    var call = (0, api_1.createEndpoint)({
        route: '/call',
        method: api_1.EndpointMethod.POST,
        validation: {
            query: undefined,
            params: undefined,
            body: Yup.object({
                service: Yup.string()
                    .equals(services.map(function (_a) {
                    var name = _a.name;
                    return name;
                }))
                    .required(),
                method: Yup.string().required(),
                params: Yup.array().required(),
            }),
        },
        action: function (_a, req) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var serviceName, method, params, receiver;
                return __generator(this, function (_b) {
                    serviceName = body.service, method = body.method, params = body.params;
                    receiver = receivers.find(function (_a) {
                        var service = _a.service;
                        return service === serviceName;
                    });
                    if (!receiver) {
                        throw new core_1.InternalException({
                            message: 'Could not find reciever for requested service.',
                            meta: {
                                description: [
                                    "Service: ".concat(serviceName),
                                    "Method: ".concat(method),
                                    "Available services: ".concat(services
                                        .map(function (_a) {
                                        var name = _a.name;
                                        return name;
                                    })
                                        .join(', ')),
                                ],
                            },
                        });
                    }
                    local_utils_1.DevelopmentLogger.LOG(local_utils_1.DevLogEvent.DistributedRemoteCallReceived, "from ".concat(req.originalUrl, " to call ").concat(serviceName, ".").concat(method));
                    return [2 /*return*/, receiver.call(method, params)];
                });
            });
        },
    });
    return (0, core_1.createModule)({
        name: 'RemoteCallReciever',
        router: new api_1.Router({
            path: '/detached',
            endpoints: [call],
        }),
    });
}
exports.createRemoteCallModule = createRemoteCallModule;
