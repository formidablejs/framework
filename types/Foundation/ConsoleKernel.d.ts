export default class ConsoleKernel {
    get default(): (typeof RouteListCommand)[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application, ctx: any): any[];
}
import { RouteListCommand } from "./Console/Commands/RouteListCommand";
