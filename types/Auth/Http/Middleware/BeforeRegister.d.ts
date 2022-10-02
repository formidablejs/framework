export default class BeforeRegister {
    /**
    @param {function} handler
    */
    static beforeRegister(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
    get defaultProtocol(): any;
}
