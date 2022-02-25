export class GenerateKeyCommand extends Command {
    get envFile(): mixed;
    get envPath(): string;
    /**
    @param {Number} length
    */
    key(length?: number): string;
    /**
    @param {String} key
    */
    updateEnv(key: string): boolean;
}
import { Command } from "@formidablejs/console";
