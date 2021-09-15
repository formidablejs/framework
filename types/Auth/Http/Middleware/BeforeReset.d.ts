export var __esModule: boolean;
export default BeforeReset;
declare class BeforeReset {
    /**
    @param {Function} handler
    */
    static beforeReset(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
}
