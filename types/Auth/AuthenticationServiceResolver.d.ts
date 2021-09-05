export = AuthenticationServiceResolver;
declare class AuthenticationServiceResolver extends ServiceResolver {
    get protocol(): any;
    get provider(): any;
}
import ServiceResolver = require("../Support/ServiceResolver");
