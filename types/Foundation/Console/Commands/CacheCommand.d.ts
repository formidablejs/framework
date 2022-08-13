export class CacheCommand extends Command {
    get config(): string;
    get address(): string;
    cache(): never;
    /**
    @param {boolean} newLine
    */
    clear(newLine?: boolean): void;
}
import { Command } from "../Command";
