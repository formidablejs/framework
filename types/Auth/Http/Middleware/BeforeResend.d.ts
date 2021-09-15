export var __esModule: boolean;
export default BeforeResend;
declare class BeforeResend {
    /**
    @param {Function} handler
    */
    static beforeResend(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
}
