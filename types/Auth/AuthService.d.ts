export var __esModule: boolean;
export default AuthService;
declare class AuthService {
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
    @param {Mailable} mailer
    */
    static verificationMailer(mailer: any): typeof AuthService;
    /**
    @param {Mailable} mailer
    */
    static resetPasswordMailer(mailer: any): typeof AuthService;
    /**
    @param {Object} config
    */
    static routes(config?: any): any;
}
