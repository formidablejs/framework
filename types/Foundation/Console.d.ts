/// <reference types="node" />
export default class Console {
    /**
    @param {string} runtime
    @param {string} console
    */
    static make(runtime?: string, console?: string): Console;
    /**
    @param {string} runtime
    @param {string} console
    */
    constructor(runtime?: string, console?: string);
    runtime: string;
    console: string;
    config: any;
    get devConfigDefaults(): {
        mode: string;
    };
    get devConfig(): any;
    get devMode(): any;
    get ext(): ".imba" | ".ts";
    run(): import("child_process").ChildProcessWithoutNullStreams;
    preServeCommands(): any;
    preServe(): void[];
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
