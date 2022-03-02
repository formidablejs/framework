export class PackagePublishCommand extends Command {
    get package(): string;
    get definition(): any;
    get publisherPath(): any;
    get publisher(): any;
    /**
    @param {String} optTag
    */
    persist(optTag: string): void;
}
import { Command } from "../Command";
