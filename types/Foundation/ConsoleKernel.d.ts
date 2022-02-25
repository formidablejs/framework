export default class ConsoleKernel {
    get default(): (typeof GenerateKeyCommand | typeof MakeConfigCommand | typeof UpCommand)[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application): any[];
}
import { GenerateKeyCommand } from "./Console/Commands/GenerateKeyCommand";
import { MakeConfigCommand } from "./Console/Commands/MakeConfigCommand";
import { UpCommand } from "./Console/Commands/UpCommand";
