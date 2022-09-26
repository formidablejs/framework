export class MakeControllerCommand extends MakeResourceCommand {
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
        api: import("@formidablejs/console/types/Props/Prop").default;
        invokable: import("@formidablejs/console/types/Props/Prop").default;
        resource: import("@formidablejs/console/types/Props/Prop").default;
        "store-request": import("@formidablejs/console/types/Props/Prop").default;
        "update-request": import("@formidablejs/console/types/Props/Prop").default;
    };
    get stub(): any;
}
import { MakeResourceCommand } from "./MakeResourceCommand";
