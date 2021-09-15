export var __esModule: boolean;
export default LogoutController;
declare const LogoutController_base: any;
declare class LogoutController extends LogoutController_base {
    [x: string]: any;
    /**
    @param {Function} handler
    */
    static onLogout(handler: Function): Function;
    static [Ψ__init__](): typeof LogoutController;
    /**
    @param {LogoutRequest} request
    */
    logout(request: any, reply: any): any;
}
declare const Ψ__init__: unique symbol;
