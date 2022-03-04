export default class ValidationServiceResolver extends ServiceResolver {
    boot(): ValidationServiceResolver;
    nullable(): boolean;
    registeredRules(): {};
    /**
    @param {Object} rules
    */
    registerRules(rules: any): ValidationServiceResolver;
}
import ServiceResolver from "../Support/ServiceResolver";
