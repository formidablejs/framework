export = EmailVerificationController;
declare class EmailVerificationController extends Controller {
    /**
    @param {Function} handler
    */
    static onVerification(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onEmailResend(handler: Function): Function;
    static [Ψinit](): typeof EmailVerificationController;
    /**
    @param {VerifyEmailRequest} request
    */
    verify(request: VerifyEmailRequest, reply: any): any;
    /**
    @param {EmailResendRequest} request
    */
    resend(request: EmailResendRequest, reply: any): any;
}
import Controller = require("../../../Http/Controller");
import VerifyEmailRequest = require("../Requests/VerifyEmailRequest");
import EmailResendRequest = require("../Requests/EmailResendRequest");
declare const Ψinit: unique symbol;
