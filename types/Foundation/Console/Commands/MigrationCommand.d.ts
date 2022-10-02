export class MigrationCommand extends Command {
    /**
    @param {string} action
    */
    call(action: string): Promise<mixed>;
}
import { Command } from "../Command";
