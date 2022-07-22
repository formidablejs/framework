/// <reference types="node" />
export default class Console {
    static make(runtime: any, console: any): Console;
    /**
    @param {String} runtime
    @param {String} console
    */
    constructor(runtime: string, console: string);
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
