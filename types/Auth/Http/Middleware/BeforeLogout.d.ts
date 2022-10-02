export default class BeforeLogout {
    /**
    @param {function} handler
    */
    static beforeLogout(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
    get defaultProtocol(): any;
}
