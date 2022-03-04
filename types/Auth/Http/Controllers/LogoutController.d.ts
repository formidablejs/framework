export default LogoutController;
declare class LogoutController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogout(handler: Function): Function;
    static [$1](): typeof LogoutController;
    constructor(...args: any[]);
    /**
    @param {LogoutRequest} request
    */
    logout(request: LogoutRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import LogoutRequest from "../Requests/LogoutRequest";
declare const $1: unique symbol;
