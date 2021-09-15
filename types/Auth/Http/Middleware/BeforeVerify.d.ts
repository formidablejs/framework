export default class BeforeVerify {
    /**
    @param {Function} handler
    */
    static beforeVerify(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
}
