export default class Application {
    /**
    @param {string} notation
    @param {any} default
    */
    static getConfig(notation: string, default$?: any): any;
    /**
    @param {string} key
    @param {any} default
    */
    static getEnv(key: string, default$?: any): any;
    static env(): any;
    static get version(): any;
    /**
    @param {string} root
    */
    constructor(root: string);
    bindings: any;
    config: any;
    hooks: any;
    plugins: any;
    root: string;
    handler: any;
    context: any;
    serverConfig: any;
    get version(): any;
    /**
    @param {number} default
    */
    port(default$?: number): number;
    host(default$?: string): string;
    routes(): any[];
    /**
    @param {object} config
    */
    server(config: object): Application;
    fastify(): any;
    /**
    @param {function} callback
    */
    intercept(callback: Function): Application;
    addHook(hook: any, handler: any): Application;
    registerCommand(command: any): Application;
    /**
    @param {function} plugin
    @param {object} options
    @param {function} handler
    */
    register(plugin: Function, options?: object, handler?: Function): Application;
    /**
    @param {string} event
    @param {function} callback
    */
    on(event: string, callback: Function): Application;
    /**
    @param {function} handler
    */
    onResponse(handler: Function): Application;
    migration(): any;
    seeder(): any;
    /**
    @param {function} abstract
    @param {array} params
    */
    make(abstract: Function, params?: any[]): any;
    /**
    @param {function} abstract
    @param {function} concrete
    */
    bind(abstract: Function, concrete: Function): Application;
    /**
    @param {boolean} distribute
    */
    cache(distribute?: boolean): any;
    /**
    @param {Kernel} kernel
    @param {boolean} returnMode
    */
    initiate(kernel: Kernel, returnMode?: boolean): Promise<Application>;
    /**
    @param {ConsoleKernel} kernel
    */
    craftsman(kernel: ConsoleKernel): {
        run: () => any;
    };
    console(): any;
    prepare(): Application;
    resolve(): any[];
    bootResolver(resolver: any): any;
    registerResolver(resolver: any): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import Kernel from "../Http/Kernel";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
