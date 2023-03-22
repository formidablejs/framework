import type { Mailable } from "@formidablejs/mailer";
import type { MailHandle } from "@formidablejs/mailer";
import Repository from "../Config/Repository";
import FormRequest from "../Http/Request/FormRequest";
import Request from "../Http/Request/Request";
import Route from "../Http/Router/Route";

interface IMailable {
    new (...args: any[]): {
        subject?: string;
        render: () => unknown;
    }
}

type RoutesConfig = {
    login?: boolean
    register?: boolean
    logout?: boolean
    email?: boolean
    password?: boolean
}

export default class AuthService {
    /**
    @param {function} callback
    */
    static beforeLogin(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeLogout(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeRegister(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeVerify(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeResend(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeForgot(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static beforeReset(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onLogin(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onLogout(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRegister(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onForgot(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onReset(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onAuthenticated(callback: (request: FormRequest | Request, reply: FastifyReply, user: User, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onFetchAuthenticated(callback: (tokenableType: string, tokenableId: number, protocol: string, token: { token: string, session: string }) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onSessionDestroyed(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onSuccessfulAttempt(callback: Function): typeof AuthService;
    /**
    @param {function} callback
    */
    static onCreateUser(callback: (request: FormRequest | Request, body: object, table: string) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRegistered(callback: (request: FormRequest | Request, reply: FastifyReply, user: User, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onVerification(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onEmailResend(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;
    /**
    @param {function} callback
    */
    static onEmailVerified(callback: (request: FormRequest | Request, reply: FastifyReply, verified: boolean, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRequestEmailVerificationUrl(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onRequestForgotPasswordUrl(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {function} callback
    */
    static onUpdatePassword(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;
    /**
    @param {IMailable} mailer
    */
    static verificationMailer(mailer: IMailable): typeof AuthService;
    /**
    @param {IMailable} mailer
    */
    static resetPasswordMailer(mailer: IMailable): typeof AuthService;
    /**
    @param {MailHandle} events
    */
    static verificationMailerEvents(events: MailHandle): typeof AuthService;
    /**
    @param {MailHandle} events
    */
    static resetMailerEvents(events: MailHandle): typeof AuthService;
    /**
    @param {RoutesConfig} config
    */
    static routes(config?: RoutesConfig): void;
}
