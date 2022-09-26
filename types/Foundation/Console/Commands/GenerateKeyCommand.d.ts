export class GenerateKeyCommand extends Command {
    get props(): {
        env: import("@formidablejs/console/types/Props/Prop").default;
        show: import("@formidablejs/console/types/Props/Prop").default;
    };
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
import { Command } from "../Command";
