/// <reference types="node" />
export default class Console {
    static make(): Console;
    constructor($$?: any);
    runtime: any;
    console: any;
    config: any;
    run(): import("child_process").ChildProcessWithoutNullStreams;
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
