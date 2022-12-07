export class ShellCommand extends Command {
    get history(): string;
    handle(): Promise<any>;
}
import { Command } from "../Command";
