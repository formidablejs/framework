export class RouteListCommand extends Command {
    get props(): {
        method: import("@formidablejs/console/types/Props/Prop").default;
    };
    get app(): any;
    handle(): void;
}
import { Command } from "@formidablejs/console";
