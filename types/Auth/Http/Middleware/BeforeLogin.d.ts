export = BeforeLogin;
declare class BeforeLogin {
    /**
    @param {Function} handler
    */
    static beforeLogin(handler: Function): Function;
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): any;
}
