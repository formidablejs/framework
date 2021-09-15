export default LoginController;
declare class LoginController extends Controller {
    /**
    @param {Function} handler
    */
    static onLogin(handler: Function): Function;
    static [Ψ__init__](): typeof LoginController;
    /**
    @param {LoginRequest} request
    */
    login(request: LoginRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import LoginRequest from "../Requests/LoginRequest";
declare const Ψ__init__: unique symbol;
