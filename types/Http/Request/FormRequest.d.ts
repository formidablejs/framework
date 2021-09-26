export default class FormRequest {
    /**
    @param {FastifyRequest} request
    @param {Repository} config
    */
    constructor(request: any, route: any, raw: any, config: any);
    request: any;
    route: any;
    config: any;
    passesAuthorization(): any;
    failedAuthorization(): void;
    rules(): {};
    messages(): {};
    locale(): any;
    defaultLocale(): any;
    /**
    @param {String} locale
    */
    setLocale(locale: string): any;
    /**
    @param {String} locale
    */
    setFallbackLocale(locale: string): any;
    /**
    @param {String} path
    @param {String} default
    */
    translate(path: string, default$: any): any;
    /**
    @param {String} path
    @param {String} default
    */
    t(path: string, default$: any): any;
    /**
    @param {String} path
    @param {String} default
    */
    __(path: string, default$: any): any;
    signature(): any;
    url(): any;
    urlWithoutQuery(): any;
    urlWithoutSignature(): any;
    fullUrl(): any;
    method(): any;
    isUrl(path: any): boolean;
    isFullUrl(path: any): boolean;
    /**
    @param {string} method
    */
    isMethod(method: string): boolean;
    headers(): any;
    /**
    @param {string} header
    */
    hasHeader(header: string): boolean;
    /**
    @param {string} header
    @param {string} value
    */
    setHeader(header: string, value: string): FormRequest;
    /**
    @param {object} headers
    */
    setHeaders(headers: object): FormRequest;
    /**
    @param {string} header
    */
    header(header: string, default$?: any): any;
    bearerToken(): any;
    getHost(): any;
    getFullOrigin(): any;
    getOrigin(): any;
    getOriginProtocol(): string;
    ip(): any;
    /**
    @param {string} path
    */
    pathIs(path: string): boolean;
    /**
    @param {string} route
    */
    routeIs(route: string): boolean;
    /**
    @param {String} name
    */
    param(name: string): any;
    params(): any;
    body(): any;
    all(): any;
    /**
    @param {string|null} key
    */
    input(key?: string | null, default$?: any): any;
    /**
    @param {string} key
    */
    has(key: string): boolean;
    /**
    @param {string} key
    */
    get(key: string, default$?: any): any;
    /**
    @param {string[]} keys
    */
    only(keys: string[]): {};
    /**
    @param {string|null} key
    */
    query(key?: string | null, default$?: any): any;
    expectsJson(): boolean;
    validate(): any;
    /**
    @param {Array} rules
    */
    setRules(rules: any[]): any[];
    getRules(): any;
    auth(): {
        user: () => any;
        check: () => boolean;
        can: (perform: string) => boolean;
    };
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
