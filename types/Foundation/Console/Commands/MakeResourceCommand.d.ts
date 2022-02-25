export class MakeResourceCommand extends Command {
    get resource(): string;
    get stub(): import("@formidablejs/stubs/types/Stub");
}
import { Command } from "@formidablejs/console";
