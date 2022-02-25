export default class ConsoleKernel {
    get default(): (typeof RouteListCommand | typeof GenerateKeyCommand | typeof MakeConfigCommand | typeof UpCommand)[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application, ctx: any): any[];
}
import { RouteListCommand } from "./Console/Commands/RouteListCommand";
import { GenerateKeyCommand } from "./Console/Commands/GenerateKeyCommand";
import { MakeConfigCommand } from "./Console/Commands/MakeConfigCommand";
import { UpCommand } from "./Console/Commands/UpCommand";
