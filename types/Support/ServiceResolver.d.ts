export = ServiceResolver;
declare class ServiceResolver {
    /**
    @param {Application} app
    */
    constructor(app: Application);
    app: Application;
    boot(): import("./ServiceResolver");
    register(): import("./ServiceResolver");
    [Ψinit]($$?: any): void;
}
import Application = require("../Foundation/Application");
declare const Ψinit: unique symbol;
