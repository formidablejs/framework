export class CacheCommand extends Command {
    get path(): string;
    cache(): void;
    clear(): void;
}
import { Command } from "../Command";
