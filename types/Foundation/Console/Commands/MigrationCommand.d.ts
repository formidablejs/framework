export class MigrationCommand extends Command {
    get app(): any;
    /**
    @param {String} environment
    */
    shouldRun(environment: string): Promise<any>;
}
import { Command } from "@formidablejs/console";
