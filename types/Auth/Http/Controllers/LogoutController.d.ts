export = LogoutController;
declare class LogoutController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogout(handler: Function): Function;
    static [Ψinit](): typeof LogoutController;
    /**
    @param {LogoutRequest} request
    */
    logout(request: LogoutRequest, reply: any): any;
}
import Controller = require("../../../Http/Controller");
import LogoutRequest = require("../Requests/LogoutRequest");
declare const Ψinit: unique symbol;
