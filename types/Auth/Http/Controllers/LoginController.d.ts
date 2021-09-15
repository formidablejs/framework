export var __esModule: boolean;
export default LoginController;
declare const LoginController_base: any;
declare class LoginController extends LoginController_base {
    [x: string]: any;
    /**
    @param {Function} handler
    */
    static onLogin(handler: Function): Function;
    static [Ψ__init__](): typeof LoginController;
    /**
    @param {LoginRequest} request
    */
    login(request: any, reply: any): any;
}
declare const Ψ__init__: unique symbol;
