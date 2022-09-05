export class ServeCommand extends Command {
    static [$__init__$](): typeof ServeCommand;
    constructor(...args: any[]);
    get props(): {
        port: any;
        host: any;
        dev: import("@formidablejs/console/types/Props/Prop").default;
        addr: import("@formidablejs/console/types/Props/Prop").default;
    };
    get runtime(): string;
    get fallbackPort(): string;
    get fallbackHost(): string;
    setEnvVars(): mixed;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
    [$address$]: any;
    [$fullAddress$]: any;
    [$command$]: any;
}
import { Command } from "../Command";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $address$: unique symbol;
declare const $fullAddress$: unique symbol;
declare const $command$: unique symbol;
export {};
