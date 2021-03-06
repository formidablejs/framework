export default class AuthService {
    /**
    @param {Function} callback
    */
    static beforeLogin(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static beforeLogout(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static beforeRegister(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static beforeVerify(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static beforeResend(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static beforeForgot(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static beforeReset(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onLogin(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onLogout(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onRegister(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onForgot(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onReset(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onAuthenticated(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onFetchAuthenticated(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onSessionDestroyed(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onSuccessfulAttempt(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onCreateUser(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onRegistered(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onVerification(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onEmailResend(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onEmailVerified(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onRequestEmailVerificationUrl(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onRequestForgotPasswordUrl(callback: Function): typeof AuthService;
    /**
    @param {Function} callback
    */
    static onUpdatePassword(callback: Function): typeof AuthService;
    /**
    @param {Mailable} mailer
    */
    static verificationMailer(mailer: Mailable): typeof AuthService;
    /**
    @param {Mailable} mailer
    */
    static resetPasswordMailer(mailer: Mailable): typeof AuthService;
    /**
    @param {Object} config
    */
    static routes(config?: any): typeof Route;
}
import { Mailable } from "@formidablejs/mailer";
import Route from "../Http/Router/Route";
