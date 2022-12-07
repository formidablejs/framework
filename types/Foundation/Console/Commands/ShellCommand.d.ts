export class ShellCommand extends Command {
    get history(): string;
    get language(): any;
    handle(): Promise<any>;
}
import { Command } from "../Command";
