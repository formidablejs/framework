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
    static [Ψ__init__](): typeof EmailVerificationController;
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
declare const Ψ__init__: unique symbol;
