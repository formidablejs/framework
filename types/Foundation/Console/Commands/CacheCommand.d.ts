export class CacheCommand extends Command {
    get config(): string;
    get address(): string;
    cache(): never;
    clear(): void;
}
import { Command } from "../Command";
