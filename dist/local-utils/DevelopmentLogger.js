"use strict";
/* eslint-disable no-console */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentLogger = exports.DevLogEvent = void 0;
var DevLogEvent;
(function (DevLogEvent) {
    // Application
    DevLogEvent["AppInit"] = "app/init";
    DevLogEvent["AppModuleAdded"] = "app/moduleAdded";
    DevLogEvent["AppChildAdded"] = "app/childAppAdded";
    // Environment
    DevLogEvent["EnvFileLoaded"] = "env/fileLoaded";
    // Router
    DevLogEvent["RouterIncomingRequest"] = "router/incomimgRequests";
    DevLogEvent["RouterRouteAdded"] = "router/routeAdded";
    // Database
    DevLogEvent["DbConnected"] = "db/connected";
    // Distributed
    DevLogEvent["DistributedDetachedServiceAdded"] = "distributed/detachedServiceAdded";
    DevLogEvent["DistributedRemoteCallReceived"] = "distributed/remoteCallReceived";
    DevLogEvent["DistributedRemoteCallResponded"] = "distributed/remoteCallResponded";
})(DevLogEvent = exports.DevLogEvent || (exports.DevLogEvent = {}));
var defaultConfiguration = {
    isEnabled: true,
    app: {
        init: true,
        moduleAdded: true,
        childAppAdded: true,
    },
    env: {
        fileLoaded: true,
    },
    router: {
        incomimgRequests: false,
        routeAdded: false,
    },
    db: {
        connected: true,
    },
    distributed: {
        detachedServiceAdded: false,
        remoteCallReceived: false,
        remoteCallResponded: false,
    },
};
var DevelopmentLogger = /** @class */ (function () {
    function DevelopmentLogger() {
    }
    DevelopmentLogger.LOG = function (event, msg) {
        var _a;
        if (!this.configuration.isEnabled) {
            return;
        }
        var _b = __read(event.split('/'), 2), groupKey = _b[0], eventKey = _b[1];
        var isEnabled = (_a = this.configuration[groupKey]) === null || _a === void 0 ? void 0 : _a[eventKey];
        if (isEnabled) {
            console.log(DevelopmentLogger.FORMAT_LOG_MESSAGE(event, msg));
        }
    };
    DevelopmentLogger.WARN = function (msg) {
        console.log(DevelopmentLogger.FORMAT_LOG_MESSAGE('WARNING', msg));
    };
    DevelopmentLogger.FORMAT_LOG_MESSAGE = function (event, msg) {
        return "[DEV][".concat(event, "]: ").concat(msg);
    };
    DevelopmentLogger.configuration = defaultConfiguration;
    return DevelopmentLogger;
}());
exports.DevelopmentLogger = DevelopmentLogger;
