export default class Driver {
    /**
    @param {function} handler
    */
    static onEmailVerified(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onCreateUser(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onRegistered(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onAuthenticated(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onSessionDestroyed(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onSuccessfulAttempt(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onRequestEmailVerificationUrl(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onRequestForgotPasswordUrl(handler: Function): Function;
    /**
    @param {function} handler
    */
    static onUpdatePassword(handler: Function): Function;
    /**
    @param {Mailable} mailer
    */
    static verificationMailer(mailer: Mailable): Mailable;
    /**
    @param {Mailable} mailer
    */
    static resetPasswordMailer(mailer: Mailable): Mailable;
    /**
    @param {MailHandle} mailEvents
    */
    static verificationMailerEvents(mailEvents: MailHandle): MailHandle;
    /**
    @param {MailHandle} mailEvents
    */
    static resetMailerEvents(mailEvents: MailHandle): MailHandle;
    /**
    @param {string} protocol
    @param {Request} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    @param {Repository} config
    */
    constructor(protocol: string, request: Request, reply: FastifyReply, params: any[] | null, config: Repository);
    protocol: string;
    request: Request;
    reply: FastifyReply;
    params: any[];
    config: Repository;
    /**
    @param {string} name
    @param {object} user
    @param {number|null} ttl
    */
    attempt(name: string, user: object, ttl?: number | null): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {string} token
    */
    getPersonalAccessToken(token?: string): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {object} token
    */
    usingPersonalAccessToken(token: object): Promise<any>;
    verify(): any;
    /**
    @param {object} body
    */
    authenticate(body: object): any;
    /**
    @param {object} body
    */
    register(body: object): any;
    /**
    @param {object} user
    */
    afterRegistered(user: object): any;
    /**
    @param {object} user
    */
    afterAuthenticated(user: object): any;
    afterSessionDestroyed(): any;
    /**
    @param {boolean} verified
    */
    afterEmailVerified(verified: boolean): any;
    afterRequestEmailVerificationUrl(): any;
    afterRequestForgotPasswordUrl(): any;
    afterUpdatePassword(): any;
    onSuccessfulAuthAttemptEvent(): any;
    getVerificationMailer(): any;
    getVerificationMailerEvents(): any;
    /**
    @param {object} user
    */
    sendVerificationEmail(user: object): Promise<any>;
    getResetPasswordMailer(): any;
    getResetMailerEvents(): any;
    /**
    @param {object} user
    @param {string} token
    */
    sendResetPasswordEmail(user: object, token: string): Promise<any>;
    verifyEmail(): Promise<any>;
    /**
    @param {object} body
    */
    requestEmailVerificationUrl(body?: object): Promise<any>;
    /**
    @param {object} body
    */
    requestForgotPasswordUrl(body?: object): Promise<any>;
    /**
    @param {object} body
    */
    updatePassword(body?: object): Promise<any>;
    /**
    @param {object} body
    */
    logout(body?: object): Driver;
    /**
    @param {string} token
    @param {object} body
    */
    destroy(token?: string, body?: object): Promise<any>;
    /**
    @param {string} name
    @param {number} id
    @param {number|null} ttl
    */
    createPersonalAccessToken(name: string, id: number, ttl?: number | null): Promise<any>;
    get getProvider(): any;
    /**
    @param {object} body
    */
    insertUser(body: object): Promise<any>;
    /**
    @param {object} body
    */
    createUser(body: object): Promise<any>;
    /**
    @param {object} body
    */
    findUser(body: object): Promise<any>;
    /**
    @param {object} user
    */
    verificationUrl(user: object): Promise<string>;
    /**
    @param {object} user
    @param {string} token
    */
    passwordResetUrl(user: object, token: string): Promise<string>;
}

import { Mailable } from "@formidablejs/mailer";
import { MailHandle } from "@formidablejs/mailer";
