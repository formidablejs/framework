export class MakeMigrationCommand extends MakeResourceCommand {
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
        table: import("@formidablejs/console/types/Props/Prop").default;
        alter: import("@formidablejs/console/types/Props/Prop").default;
    };
    get stub(): any;
}
import { MakeResourceCommand } from "./MakeResourceCommand";
