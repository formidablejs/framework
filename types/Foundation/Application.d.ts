import Kernel from "../Http/Kernel";
import ConsoleKernel from "./ConsoleKernel";
import ConfigRepository from "../Config/Repository";
import { FastifyInstance } from 'fastify'
import { ContextAPI } from "./Context";
import { Application as ApplicationConsole } from "@formidablejs/console";

type beforeListenCallback = (port: number, host: string) => void;

interface ICommand {
    new (...args: any[]): {
        /**
         * The name and signature of the console command.
         */
        get signature(): string;

        /**
         * The console command description.
         */
        get description(): ?string;

        /**
         * Execute the console command.
         */
        handle(): unknown;
    }
}

export default class Application {
    static getConfig(notation: string, default$?: any): any;

    static getEnv(key: string, default$?: any): any;

    static env(): any;

    static get version(): string;

    constructor(root: string);

    bindings: any;
    config: ConfigRepository;
    hooks: Array<object>;
    plugins: Array<object>;
    root: string;
    handler: any;
    context: ContextAPI;
    serverConfig: any;

    get version(): string;

    port(default$?: number): number;

    host(default$?: string): string;

    routes(): any[];

    onBeforeListen(event: beforeListenCallback): void;

    server(config: object): Application;

    fastify(): FastifyInstance;

    intercept(callback: Function): Application;

    addHook(hook: string, handler: any): Application;

    registerCommand(command: ICommand): Application;

    register(plugin: Function, options?: object, handler?: Function): Application;

    on(event: string, callback: Function): Application;

    onResponse(handler: Function): Application;

    migration(): any;

    seeder(): any;

    make(abstract: Function, params?: any[]): any;

    bind(abstract: Function, concrete: Function): Application;

    cache(distribute?: boolean): any;

    initiate(kernel: Kernel, returnMode?: boolean): Promise<Application>;

    craftsman(kernel: ConsoleKernel): {  run: () => any; };

    console(): ApplicationConsole;

    prepare(): Application;

    resolve(): any[];

    bootResolver(resolver: any): any;

    registerResolver(resolver: any): any;
}
