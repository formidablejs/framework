export class MakeConfigCommand extends MakeResourceCommand {
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
    };
    get stub(): any;
}
import { MakeResourceCommand } from "./MakeResourceCommand";
