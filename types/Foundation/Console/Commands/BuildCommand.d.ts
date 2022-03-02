/// <reference types="node" />
export class BuildCommand extends Command {
    get compiler(): string;
    /**
    @param {String[]} customArgs
    */
    build(customArgs?: string[]): import("child_process").SpawnSyncReturns<Buffer>;
}
import { Command } from "../Command";
