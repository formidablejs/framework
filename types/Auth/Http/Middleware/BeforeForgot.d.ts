export default class BeforeForgot {
    /**
    @param {function} handler
    */
    static beforeForgot(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
    get defaultProtocol(): any;
}
