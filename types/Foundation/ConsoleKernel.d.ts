export default class ConsoleKernel {
    get default(): (typeof MigrateLatestCommand | typeof GenerateKeyCommand | typeof MakeConfigCommand | typeof UpCommand)[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application, ctx: any): any[];
}
import { MigrateLatestCommand } from "./Console/Commands/MigrateLatestCommand";
import { GenerateKeyCommand } from "./Console/Commands/GenerateKeyCommand";
import { MakeConfigCommand } from "./Console/Commands/MakeConfigCommand";
import { UpCommand } from "./Console/Commands/UpCommand";
