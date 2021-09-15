export default class Authenticate {
    constructor(config: any);
    config: any;
    /**
    @param {any[]} params
    */
    handle(request: any, reply: any, params: any[]): Promise<() => Auth>;
    configure(protocol: any): any;
}
import Auth from "../../Auth";
