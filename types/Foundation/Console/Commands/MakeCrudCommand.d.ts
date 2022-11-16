export class MakeCrudCommand extends Command {
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
        api: import("@formidablejs/console/types/Props/Prop").default;
        schema: import("@formidablejs/console/types/Props/Prop").default;
        repository: import("@formidablejs/console/types/Props/Prop").default;
        type: import("@formidablejs/console/types/Props/Prop").default;
    };
    handle(): Promise<mixed>;
}
import { Command } from "../Command";
