export default class AuthService {
    /**
    @param {function} callback
    */
    static beforeLogin(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeLogout(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeRegister(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeVerify(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeResend(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeForgot(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeReset(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onLogin(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onLogout(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRegister(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onForgot(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onReset(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onAuthenticated(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onFetchAuthenticated(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onSessionDestroyed(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onSuccessfulAttempt(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onCreateUser(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRegistered(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onVerification(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onEmailResend(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onEmailVerified(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRequestEmailVerificationUrl(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRequestForgotPasswordUrl(callback: Function): typeof AuthService;
    /**
    @param {function} callback
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
    @param {MailHandle} events
    */
    static verificationMailerEvents(events: MailHandle): typeof AuthService;
    /**
    @param {MailHandle} events
    */
    static resetMailerEvents(events: MailHandle): typeof AuthService;
    /**
    @param {object} config
    */
    static routes(config?: object): typeof Route;
}
import { Mailable } from "@formidablejs/mailer";
import { MailHandle } from "@formidablejs/mailer";
import Route from "../Http/Router/Route";
