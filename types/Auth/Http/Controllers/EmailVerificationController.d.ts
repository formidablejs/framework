export default EmailVerificationController;
declare class EmailVerificationController extends Controller {
    /**
    @param {Function} handler
    */
    static onVerification(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onEmailResend(handler: Function): Function;
    static [$1](): typeof EmailVerificationController;
    constructor(...args: any[]);
    /**
    @param {VerifyEmailRequest} request
    */
    verify(request: VerifyEmailRequest, reply: any): any;
    /**
    @param {EmailResendRequest} request
    */
    resend(request: EmailResendRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import VerifyEmailRequest from "../Requests/VerifyEmailRequest";
import EmailResendRequest from "../Requests/EmailResendRequest";
declare const $1: unique symbol;
