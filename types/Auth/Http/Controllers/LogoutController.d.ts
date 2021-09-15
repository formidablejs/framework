export default LogoutController;
declare class LogoutController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogout(handler: Function): Function;
    static [Ψ__init__](): typeof LogoutController;
    /**
    @param {LogoutRequest} request
    */
    logout(request: LogoutRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import LogoutRequest from "../Requests/LogoutRequest";
declare const Ψ__init__: unique symbol;
