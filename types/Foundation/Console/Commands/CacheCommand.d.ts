export class CacheCommand extends Command {
    get config(): string;
    get address(): string;
    cache(): void;
    clear(): void;
}
import { Command } from "../Command";
