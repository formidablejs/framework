export default class ConsoleKernel {
    get default(): (typeof MakeCrudCommand | typeof DbSeedCommand | typeof GenerateKeyCommand | typeof MakeCommandCommand | typeof ServeCommand | typeof ShellCommand)[];
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
import { MakeCrudCommand } from "./Console/Commands/MakeCrudCommand";
import { DbSeedCommand } from "./Console/Commands/DbSeedCommand";
import { GenerateKeyCommand } from "./Console/Commands/GenerateKeyCommand";
import { MakeCommandCommand } from "./Console/Commands/MakeCommandCommand";
import { ServeCommand } from "./Console/Commands/ServeCommand";
import { ShellCommand } from "./Console/Commands/ShellCommand";
