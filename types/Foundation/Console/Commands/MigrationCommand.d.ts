export class MigrationCommand extends Command {
    /**
    @param {string} action
    */
    call(action: string, exitOnEnd?: boolean): Promise<mixed>;
}
import { Command } from "../Command";
