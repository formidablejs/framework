export default class ValidationServiceResolver extends ServiceResolver {
    boot(): ValidationServiceResolver;
    nullable(): boolean;
    registeredRules(): {};
    /**
    @param {object} rules
    */
    registerRules(rules: object): ValidationServiceResolver;
}
import ServiceResolver from "../Support/ServiceResolver";
