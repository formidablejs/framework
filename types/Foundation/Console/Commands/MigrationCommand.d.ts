export class MigrationCommand extends Command {
    /**
    @param {String} action
    */
    call(action: string): Promise<mixed>;
}
import { Command } from "../Command";
