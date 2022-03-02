export class MigrationCommand extends Command {
    /**
    @param {String} action
    */
    call(action: string): Promise<never>;
}
import { Command } from "../Command";
