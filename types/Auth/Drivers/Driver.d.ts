export = Driver;
declare class Driver {
    /**
    @param {Function} handler
    */
    static onRegistered(handler: Function): Function;
    /**
    @param {Function} handler
    */
    static onAuthenticated(handler: Function): Function;
    static verificationMailer(mailer: any): any;
    static resetPasswordMailer(mailer: any): any;
    constructor(protocol: any, request: any, reply: any, params: any, config: any);
    protocol: any;
    request: any;
    reply: any;
    params: any;
    config: any;
    /**
    @param {String} token
    */
    getPersonalAccessToken(token?: string): Promise<{
        /**
        @param {Object} body
        */
        token: any;
        tokenable: any;
    }>;
    /**
    @param {Object} body
    */
    authenticate(body: any): import("./Driver");
    /**
    @param {Object} body
    */
    register(body: any): import("./Driver");
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
    logout(body?: any): import("./Driver");
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
