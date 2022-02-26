export class MigrationCommand extends Command {
    /**
    @param {String} environment
    */
    shouldRun(environment: string): Promise<any>;
    /**
    @param {String} action
    */
    call(action: string): Promise<void>;
}
import { Command } from "../Command";
