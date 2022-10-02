export default class BeforeReset {
    /**
    @param {function} handler
    */
    static beforeReset(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
    get defaultProtocol(): any;
}
