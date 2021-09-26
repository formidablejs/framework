export default class Driver {
    /**
    @param {Function} handler
    */
    static onRegistered(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onAuthenticated(handler: Function): Function;
    /**
    @param {Mailable} mailer
    */
    static verificationMailer(mailer: any): any;
    /**
    @param {Mailable} mailer
    */
    static resetPasswordMailer(mailer: any): any;
    /**
    @param {String} protocol
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    @param {Repository} config
    */
    constructor(protocol: string, request: any, reply: any, params: any[] | null, config: any);
    protocol: string;
    request: any;
    reply: any;
    params: any[];
    config: any;
    /**
    @param {String} name
    @param {Object} user
    */
    attempt(name: string, user: any): Promise<{
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
    verify(): Driver;
    /**
    @param {Object} body
    */
    authenticate(body: any): Driver;
    /**
    @param {Object} body
    */
    register(body: any): Driver;
    /**
    @param {Object} user
    */
    afterRegistered(user: any): any;
    /**
    @param {Object} user
    */
    afterAuthenticated(user: any): any;
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
    verifyEmail(): Promise<{
        status: string;
    }>;
    /**
    @param {Object} body
    */
    requestEmailVerificationUrl(body?: any): Promise<{
        status: string;
    }>;
    /**
    @param {Object} body
    */
    requestForgotPasswordUrl(body?: any): Promise<{
        status: string;
    }>;
    /**
    @param {Object} body
    */
    updatePassword(body?: any): Promise<{
        status: string;
    }>;
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
    */
    createPersonalAccessToken(name: string, id: number): Promise<any>;
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
