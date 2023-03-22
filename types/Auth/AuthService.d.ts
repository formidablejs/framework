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
    /**
     * Add or remove login route.
     *
     * @default true
     */
    login?: boolean

    /**
     * Add or remove register route.
     *
     * @default true
     */
    register?: boolean

    /**
     * Add or remove logout route.
     *
     * @default true
     */
    logout?: boolean

    /**
     * Add or remove email route.
     *
     * @default true
     */
    email?: boolean

    /**
     * Add or remove password route.
     *
     * @default true
     */
    password?: boolean
}

export default class AuthService {
    static beforeLogin(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static beforeLogout(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static beforeRegister(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static beforeVerify(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static beforeResend(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static beforeForgot(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static beforeReset(callback: (request: FormRequest | Request, reply: FastifyReply, params: ?Array<string>, config: Repository) => any): typeof AuthService;

    static onLogin(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onLogout(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onRegister(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onForgot(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onReset(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onAuthenticated(callback: (request: FormRequest | Request, reply: FastifyReply, user: User, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static onFetchAuthenticated(callback: (tokenableType: string, tokenableId: number, protocol: string, token: { token: string, session: string }) => void): typeof AuthService;

    static onSessionDestroyed(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static onSuccessfulAttempt(callback: Function): typeof AuthService;

    static onCreateUser(callback: (request: FormRequest | Request, body: object, table: string) => any): typeof AuthService;

    static onRegistered(callback: (request: FormRequest | Request, reply: FastifyReply, user: User, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static onVerification(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onEmailResend(callback: (request: FormRequest | Request, reply: FastifyReply) => any): typeof AuthService;

    static onEmailVerified(callback: (request: FormRequest | Request, reply: FastifyReply, verified: boolean, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static onRequestEmailVerificationUrl(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static onRequestForgotPasswordUrl(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static onUpdatePassword(callback: (request: FormRequest | Request, reply: FastifyReply, protocol: string, params: ?Array<string>) => void): typeof AuthService;

    static verificationMailer(mailer: IMailable): typeof AuthService;

    static resetPasswordMailer(mailer: IMailable): typeof AuthService;

    static verificationMailerEvents(events: MailHandle): typeof AuthService;

    static resetMailerEvents(events: MailHandle): typeof AuthService;

    static routes(config?: RoutesConfig): void;
}
