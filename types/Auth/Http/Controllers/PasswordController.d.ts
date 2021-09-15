export default PasswordController;
declare class PasswordController extends Controller {
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
    forgot(request: ForgotPasswordRequest, reply: any): any;
    /**
    @param {ResetPasswordRequest} request
    */
    reset(request: ResetPasswordRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import ForgotPasswordRequest from "../Requests/ForgotPasswordRequest";
import ResetPasswordRequest from "../Requests/ResetPasswordRequest";
declare const Ψ__init__: unique symbol;
