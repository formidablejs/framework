export class MigrationCommand extends Command {
    /**
    @param {String} action
    */
    call(action: string): Promise<void>;
}
import { Command } from "../Command";
