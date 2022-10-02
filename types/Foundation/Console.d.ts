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
    run(): import("child_process").ChildProcessWithoutNullStreams;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
