/// <reference types="node" />

type RunOptions = {
  prod: boolean;
}

export default class Console {
    runtime: string;
    console: string;
    config: any;

    constructor(runtime?: string, console?: string);

    /**
     * Make console instance.
     */
    static make(runtime?: string, console?: string): Console;

    get devConfigDefaults(): {
        mode: string;
    };

    get devConfig(): any;

    get devMode(): any;

    get ext(): ".imba" | ".ts";

    /**
     * Run craftsman.
     */
    run(options?: RunOptions): import("child_process").ChildProcessWithoutNullStreams;

    preServeCommands(): any;

    preServe(): void[];
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
