export class MakeCrudCommand extends Command {
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
        api: import("@formidablejs/console/types/Props/Prop").default;
    };
}
import { Command } from "../Command";
