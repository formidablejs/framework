export class PackagePublishCommand extends Command {
    get props(): {
        package: import("@formidablejs/console/types/Props/Prop").default;
        tag: import("@formidablejs/console/types/Props/Prop").default;
        force: import("@formidablejs/console/types/Props/Prop").default;
    };
    get package(): string;
    get basePackage(): string;
    get language(): any;
    get definition(): any;
    get publisherPath(): any;
    get publisher(): any;
    /**
    @param {string} optTag
    */
    persist(optTag: string): void;
}
import { Command } from "../Command";
