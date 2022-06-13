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
    [$2]($$?: {}): void;
    [$1]($$?: any, deep?: boolean): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
