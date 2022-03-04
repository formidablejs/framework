export class MakeResourceCommand extends Command {
    get resource(): string;
    get stub(): import("@formidablejs/stubs/types/Stub");
    handle(): void;
}
import { Command } from "../Command";
