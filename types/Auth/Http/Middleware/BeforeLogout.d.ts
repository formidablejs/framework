export = BeforeLogout;
declare class BeforeLogout {
    /**
    @param {Function} handler
    */
    static beforeLogout(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
}
