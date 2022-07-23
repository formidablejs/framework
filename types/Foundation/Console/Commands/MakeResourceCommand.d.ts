export class MakeResourceCommand extends Command {
    get resource(): string;
    get package(): string;
    get language(): any;
    get stub(): import("@formidablejs/stubs/types/Stub");
    handle(): void;
}
import { Command } from "../Command";
