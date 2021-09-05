export = LoginController;
declare class LoginController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogin(handler: Function): Function;
    static [Ψinit](): typeof LoginController;
    /**
    @param {LoginRequest} request
    */
    login(request: LoginRequest, reply: any): any;
}
import Controller = require("../../../Http/Controller");
import LoginRequest = require("../Requests/LoginRequest");
declare const Ψinit: unique symbol;
