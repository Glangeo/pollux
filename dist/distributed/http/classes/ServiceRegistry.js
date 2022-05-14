"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRegistry = void 0;
var ServiceRegistry = /** @class */ (function () {
    function ServiceRegistry() {
    }
    ServiceRegistry.setCurrentServiceName = function (name) {
        this.currentServiceName = name;
    };
    ServiceRegistry.setService = function (service, instance) {
        this.registry[service.name] = instance;
    };
    ServiceRegistry.getService = function (service) {
        var instance = this.registry[service.name];
        if (!instance) {
            throw new Error("Service ".concat(service.name, " was not added to the registry. Check your configuration file"));
        }
        return instance;
    };
    ServiceRegistry.registry = {};
    return ServiceRegistry;
}());
exports.ServiceRegistry = ServiceRegistry;
