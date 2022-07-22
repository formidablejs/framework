export default LogoutController;
declare class LogoutController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogout(handler: Function): Function;
    static [$__init__$](): typeof LogoutController;
    constructor(...args: any[]);
    /**
    @param {LogoutRequest} request
    */
    logout(request: LogoutRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import LogoutRequest from "../Requests/LogoutRequest";
declare const $__init__$: unique symbol;
