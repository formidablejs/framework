export default class BeforeForgot {
    /**
    @param {Function} handler
    */
    static beforeForgot(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
}
