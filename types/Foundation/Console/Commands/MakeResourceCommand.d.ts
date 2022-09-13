export class MakeResourceCommand extends Command {
    get resource(): string;
    get package(): string;
    get language(): any;
    get stub(): import("@formidablejs/stubs/types/Stub");
    handle(): never;
}
import { Command } from "../Command";
