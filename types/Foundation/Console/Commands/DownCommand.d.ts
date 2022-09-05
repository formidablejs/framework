export class DownCommand extends MaintenanceCommand {
    get props(): {
        message: import("@formidablejs/console/types/Props/Prop").default;
        retry: import("@formidablejs/console/types/Props/Prop").default;
        refresh: import("@formidablejs/console/types/Props/Prop").default;
        secret: import("@formidablejs/console/types/Props/Prop").default;
        status: import("@formidablejs/console/types/Props/Prop").default;
        redirect: import("@formidablejs/console/types/Props/Prop").default;
    };
    handle(): never;
}
import { MaintenanceCommand } from "./MaintenanceCommand";
