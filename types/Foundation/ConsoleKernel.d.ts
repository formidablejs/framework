export default class ConsoleKernel {
    get default(): any[];
    get registered(): any[];
    /**
    @param {Application} app
    */
    registerCommands(app: Application): any[];
}
