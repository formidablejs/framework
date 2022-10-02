export class GenerateKeyCommand extends Command {
    get props(): {
        env: import("@formidablejs/console/types/Props/Prop").default;
        show: import("@formidablejs/console/types/Props/Prop").default;
    };
    get envFile(): mixed;
    get envPath(): string;
    /**
    @param {number} length
    */
    key(length?: number): string;
    /**
    @param {string} key
    */
    updateEnv(key: string): boolean;
}
import { Command } from "../Command";
