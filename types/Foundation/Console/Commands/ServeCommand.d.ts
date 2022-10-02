export class ServeCommand extends Command {
    static [$__init__$](): typeof ServeCommand;
    constructor(...args: any[]);
    get props(): {
        port: any;
        host: any;
        dev: import("@formidablejs/console/types/Props/Prop").default;
        addr: import("@formidablejs/console/types/Props/Prop").default;
    };
    get ext(): ".imba" | ".ts";
    get runtime(): string;
    get devConfigDefaults(): {
        commands: any[];
        ignore: string[];
        ext: string[];
        delay: number;
    };
    get devConfig(): any;
    get devCommands(): any[];
    get devIgnore(): any[];
    get devExt(): any[];
    get devDelay(): any;
    get commandList(): string;
    get fallbackPort(): string;
    get fallbackHost(): string;
    setEnvVars(): mixed;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
    get [$command$](): string;
    [$address$]: any;
    [$fullAddress$]: any;
}
import { Command } from "../Command";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $command$: unique symbol;
declare const $address$: unique symbol;
declare const $fullAddress$: unique symbol;
export {};
