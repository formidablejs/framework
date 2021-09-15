export var __esModule: boolean;
export default EmailVerificationController;
declare const EmailVerificationController_base: any;
declare class EmailVerificationController extends EmailVerificationController_base {
    [x: string]: any;
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
    verify(request: any, reply: any): any;
    /**
    @param {EmailResendRequest} request
    */
    resend(request: any, reply: any): any;
}
declare const Ψ__init__: unique symbol;
