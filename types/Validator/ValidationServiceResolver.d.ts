export = ValidationServiceResolver;
declare class ValidationServiceResolver extends ServiceResolver {
    registeredRules(): {};
    /**
    @param {Object} rules
    */
    registerRules(rules: any): import("./ValidationServiceResolver");
}
import ServiceResolver = require("../Support/ServiceResolver");
