export default class VerifyCsrfToken {
    /**
    @param {Repository} config
    */
    constructor(config: any);
    get addHttpCookie(): boolean;
    get except(): any[];
    config: any;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    handle(request: any, reply: any): any;
    /**
    @param {FormRequest} request
    */
    isReading(request: any): boolean;
    /**
    @param {FormRequest} request
    */
    shouldIgnore(request: any): boolean;
    /**
    @param {FormRequest} request
    */
    tokensMatch(request: any): any;
    /**
    @param {FormRequest} request
    */
    getTokenFromRequest(request: any): any;
    shouldAddXsrfTokenCookie(): boolean;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    addCookieToResponse(request: any, reply: any): any;
    /**
    @param {FormRequest} request
    */
    forgetTokens(request: any): any;
}
