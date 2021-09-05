export = Application;
declare class Application {
    /**
    @param {String} root
    */
    constructor(root: string);
    bindings: any;
    root: string;
    config: any;
    hooks: any;
    routes(): any[];
    fastify(): any;
    addHook(hook: any, handler: any): import("./Application");
    /**
    @param {Function} abstract
    @param {array} params
    */
    make(abstract: Function, params?: any[]): any;
    /**
    @param {Function} abstract
    @param {Function} concrete
    */
    bind(abstract: Function, concrete: Function): import("./Application");
    /**
    @param {Kernel} kernel
    @param {Boolean} testMode
    */
    initiate(kernel: Kernel, testMode?: boolean): Promise<import("./Application")>;
    prepare(): import("./Application");
    resolve(): any[];
    boot(resolver: any): any;
    register(resolver: any): any;
    [Ψinit]($$?: any): void;
}
import Kernel = require("../Http/Kernel");
declare const Ψinit: unique symbol;
