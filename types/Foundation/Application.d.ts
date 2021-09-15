export var __esModule: boolean;
export default Application;
declare class Application {
    /**
    @param {String} notation
    @param {any} default
    */
    static getConfig(notation: string, default$?: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    static getEnv(key: string, default$?: any): any;
    static env(): any;
    /**
    @param {String} root
    */
    constructor(root: string);
    bindings: any;
    config: any;
    hooks: any;
    root: string;
    /**
    @param {Number} default
    */
    port(default$?: number): number;
    routes(): any;
    fastify(): any;
    addHook(hook: any, handler: any): Application;
    /**
    @param {Function} abstract
    @param {array} params
    */
    make(abstract: Function, params?: any[]): any;
    /**
    @param {Function} abstract
    @param {Function} concrete
    */
    bind(abstract: Function, concrete: Function): Application;
    cache(): any;
    /**
    @param {Kernel} kernel
    @param {Boolean} returnMode
    */
    initiate(kernel: any, returnMode?: boolean): Promise<Application>;
    prepare(): Application;
    resolve(): any[];
    boot(resolver: any): any;
    register(resolver: any): any;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
