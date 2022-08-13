/// <reference types="node" />
export class ServeCommand extends Command {
    get props(): {
        port: any;
        host: any;
        dev: import("@formidablejs/console/types/Props/Prop").default;
        addr: import("@formidablejs/console/types/Props/Prop").default;
    };
    get runtime(): string;
    get fallbackPort(): string;
    get fallbackHost(): string;
    handle(): void | (import("child_process").SpawnSyncReturns<Buffer> & import("child_process").SpawnSyncReturns<string> & import("child_process").SpawnSyncReturns<string | Buffer>);
    setEnvVars(): mixed;
}
import { Command } from "../Command";
