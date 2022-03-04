export default LoginController;
declare class LoginController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogin(handler: Function): Function;
    static [$1](): typeof LoginController;
    constructor(...args: any[]);
    /**
    @param {LoginRequest} request
    */
    login(request: LoginRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import LoginRequest from "../Requests/LoginRequest";
declare const $1: unique symbol;
