export = VerifyCsrfToken;
declare class VerifyCsrfToken {
    constructor(config: any);
    get addHttpCookie(): boolean;
    get except(): any[];
    config: any;
    handle(request: any, reply: any): any;
    isReading(request: any): boolean;
    shouldIgnore(request: any): boolean;
    tokensMatch(request: any): boolean;
    getTokenFromRequest(request: any): any;
    shouldAddXsrfTokenCookie(): boolean;
    addCookieToResponse(request: any, reply: any): any;
    forgetTokens(request: any): any;
}
