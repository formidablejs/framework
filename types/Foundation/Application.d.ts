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
    config: ConfigRepository;
    hooks: Array;
    plugins: Array;
    root: string;
    handler: any;
    context: ContextAPI;
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
    @param {Function} callback
    */
    intercept(callback: Function): Application;
    addHook(hook: any, handler: any): Application;
    registerCommand(command: any): Application;
    /**
    @param {Function} plugin
    @param {object} options
    @param {Function} handler
    */
    register(plugin: Function, options?: object, handler?: Function): Application;
    /**
    @param {string} event
    @param {Function} callback
    */
    on(event: string, callback: Function): Application;
    /**
    @param {Function} handler
    */
    onResponse(handler: Function): Application;
    migration(): any;
    seeder(): any;
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
    console(): ApplicationConsole;
    prepare(): Application;
    resolve(): any[];
    bootResolver(resolver: any): any;
    registerResolver(resolver: any): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import Kernel from "../Http/Kernel";
import type ConsoleKernel from './ConsoleKernel'
import type ConfigRepository from '../Config/Repository'
import type { ContextAPI } from './Context'
import type { Application as ApplicationConsole } from '@formidablejs/console'
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
