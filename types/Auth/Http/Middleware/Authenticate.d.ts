export var __esModule: boolean;
export default Authenticate;
declare class Authenticate {
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): Promise<() => any>;
    configure(protocol: any): any;
}
