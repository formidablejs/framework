export default class BeforeResend {
    /**
    @param {function} handler
    */
    static beforeResend(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
    get defaultProtocol(): any;
}
