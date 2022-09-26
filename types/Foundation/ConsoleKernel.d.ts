export default class ConsoleKernel {
    get default(): (typeof EnvironmentCommand | typeof ServeCommand)[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application, ctx: any): any[][];
    /**
    @param {Application} app
    */
    loadEvents(app: Application): any[][];
}
import { EnvironmentCommand } from "./Console/Commands/EnvironmentCommand";
import { ServeCommand } from "./Console/Commands/ServeCommand";
