export var __esModule: boolean;
export default PasswordController;
declare const PasswordController_base: any;
declare class PasswordController extends PasswordController_base {
    [x: string]: any;
    /**
    @param {Function} handler
    */
    static onForgot(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onReset(handler: Function): Function;
    static [Ψ__init__](): typeof PasswordController;
    /**
    @param {ForgotPasswordRequest} request
    */
    forgot(request: any, reply: any): any;
    /**
    @param {ResetPasswordRequest} request
    */
    reset(request: any, reply: any): any;
}
declare const Ψ__init__: unique symbol;
