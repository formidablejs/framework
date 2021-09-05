export = PasswordController;
declare class PasswordController extends Controller {
    /**
    @param {Function} handler
    */
    static onForgot(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onReset(handler: Function): Function;
    static [Ψinit](): typeof PasswordController;
    /**
    @param {ForgotPasswordRequest} request
    */
    forgot(request: ForgotPasswordRequest, reply: any): any;
    /**
    @param {ResetPasswordRequest} request
    */
    reset(request: ResetPasswordRequest, reply: any): any;
}
import Controller = require("../../../Http/Controller");
import ForgotPasswordRequest = require("../Requests/ForgotPasswordRequest");
import ResetPasswordRequest = require("../Requests/ResetPasswordRequest");
declare const Ψinit: unique symbol;
