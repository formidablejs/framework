export default EmailVerificationController;
declare class EmailVerificationController extends Controller {
    /**
    @param {function} handler
    */
    static onVerification(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onEmailResend(handler: Function): Function;
    static [$__init__$](): typeof EmailVerificationController;
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
declare const $__init__$: unique symbol;
