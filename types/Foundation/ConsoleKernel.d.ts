export default class ConsoleKernel {
    get default(): (typeof EnvironmentCommand)[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application, ctx: any): any[];
}
import { EnvironmentCommand } from "./Console/Commands/EnvironmentCommand";
