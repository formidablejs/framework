export default class Driver {
    /**
    @param {Function} handler
    */
    static onEmailVerified(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onCreateUser(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onRegistered(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onAuthenticated(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onSessionDestroyed(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onSuccessfulAttempt(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onRequestEmailVerificationUrl(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onRequestForgotPasswordUrl(handler: Function): Function;
    /**
    @param {Function} handler
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
    @param {String} protocol
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
    @param {String} name
    @param {Object} user
    @param {Number|null} ttl
    */
    attempt(name: string, user: any, ttl?: number | null): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {String} token
    */
    getPersonalAccessToken(token?: string): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {Object} token
    */
    usingPersonalAccessToken(token: any): Promise<any>;
    verify(): any;
    /**
    @param {Object} body
    */
    authenticate(body: any): any;
    /**
    @param {Object} body
    */
    register(body: any): any;
    /**
    @param {Object} user
    */
    afterRegistered(user: any): any;
    /**
    @param {Object} user
    */
    afterAuthenticated(user: any): any;
    afterSessionDestroyed(): any;
    /**
    @param {Boolean} verified
    */
    afterEmailVerified(verified: boolean): any;
    afterRequestEmailVerificationUrl(): any;
    afterRequestForgotPasswordUrl(): any;
    afterUpdatePassword(): any;
    onSuccessfulAuthAttemptEvent(): any;
    getVerificationMailer(): any;
    /**
    @param {Object} user
    */
    sendVerificationEmail(user: any): Promise<any>;
    getResetPasswordMailer(): any;
    /**
    @param {Object} user
    @param {String} token
    */
    sendResetPasswordEmail(user: any, token: string): Promise<any>;
    verifyEmail(): Promise<any>;
    /**
    @param {Object} body
    */
    requestEmailVerificationUrl(body?: any): Promise<any>;
    /**
    @param {Object} body
    */
    requestForgotPasswordUrl(body?: any): Promise<any>;
    /**
    @param {Object} body
    */
    updatePassword(body?: any): Promise<any>;
    /**
    @param {Object} body
    */
    logout(body?: any): Driver;
    /**
    @param {String} token
    @param {Object} body
    */
    destroy(token?: string, body?: any): Promise<any>;
    /**
    @param {String} name
    @param {Number} id
    @param {Number|null} ttl
    */
    createPersonalAccessToken(name: string, id: number, ttl?: number | null): Promise<any>;
    get getProvider(): any;
    /**
    @param {Object} body
    */
    insertUser(body: any): Promise<any>;
    /**
    @param {Object} body
    */
    createUser(body: any): Promise<any>;
    /**
    @param {Object} body
    */
    findUser(body: any): Promise<any>;
    /**
    @param {Object} user
    */
    verificationUrl(user: any): Promise<string>;
    /**
    @param {Object} user
    @param {String} token
    */
    passwordResetUrl(user: any, token: string): Promise<string>;
}
