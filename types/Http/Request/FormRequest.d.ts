export default class FormRequest {
    /**
    @param {FastifyRequest} request
    @param {Object} route
    @param {FastifyReply} reply
    @param {Repository} config
    */
    constructor(request: any, route: any, reply: any, config: any);
    request: any;
    reply: any;
    route: any;
    config: any;
    _rules: any;
    get version(): any;
    passesAuthorization(): any;
    failedAuthorization(): void;
    rules(): {};
    messages(): {};
    /**
         * Get request locale.
         */
    /**
    *
         * Get request locale.
         
    */
    locale(): any;
    /**
         * Get request default locale.
         */
    /**
    *
         * Get request default locale.
         
    */
    defaultLocale(): any;
    /**
         * Set locale.
         */
    /**
    *
         * Set locale.
         
    @param {String} locale
    */
    setLocale(locale: string): any;
    /**
         * Set fallback locale.
         */
    /**
    *
         * Set fallback locale.
         
    @param {String} locale
    */
    setFallbackLocale(locale: string): any;
    /**
         * Translate text.
         */
    /**
    *
         * Translate text.
         
    @param {String} path
    @param {String} default
    */
    translate(path: string, default$: any): any;
    /**
         * Translate text.
         */
    /**
    *
         * Translate text.
         
    @param {String} path
    @param {String} default
    */
    t(path: string, default$: any): any;
    /**
         * Translate text.
         */
    /**
    *
         * Translate text.
         
    @param {String} path
    @param {String} default
    */
    __(path: string, default$: any): any;
    /**
         * Get url signature.
         */
    /**
    *
         * Get url signature.
         
    */
    signature(): any;
    /**
         * Get request url.
         */
    /**
    *
         * Get request url.
         
    */
    url(): any;
    /**
         * Get request url without query.
         */
    /**
    *
         * Get request url without query.
         
    */
    urlWithoutQuery(): any;
    /**
         * Get request url without signature.
         */
    /**
    *
         * Get request url without signature.
         
    */
    urlWithoutSignature(): any;
    /**
         * Get full request url.
         */
    /**
    *
         * Get full request url.
         
    */
    fullUrl(): any;
    /**
         * Get request method.
         */
    /**
    *
         * Get request method.
         
    */
    method(): any;
    /**
         * Check if path matches current request path.
         */
    /**
    *
         * Check if path matches current request path.
         
    */
    isUrl(path: any): boolean;
    /**
         * Check if path matches current request path.
         */
    /**
    *
         * Check if path matches current request path.
         
    */
    isFullUrl(path: any): boolean;
    /**
         * Check if method matches current request method.
         */
    /**
    *
         * Check if method matches current request method.
         
    @param {string} method
    */
    isMethod(method: string): boolean;
    /**
         * Get request headers.
         */
    /**
    *
         * Get request headers.
         
    */
    headers(): any;
    /**
         * Check if header is present.
         */
    /**
    *
         * Check if header is present.
         
    @param {string} header
    */
    hasHeader(header: string): boolean;
    /**
         * Set request header.
         */
    /**
    *
         * Set request header.
         
    @param {string} header
    @param {string} value
    */
    setHeader(header: string, value: string): FormRequest;
    /**
         * Set request headers.
         */
    /**
    *
         * Set request headers.
         
    @param {object} headers
    */
    setHeaders(headers: object): FormRequest;
    /**
         * Get specified header.
         */
    /**
    *
         * Get specified header.
         
    @param {string} header
    */
    header(header: string, default$?: any): any;
    /**
         * Get bearer token used to authenticate current request.
         */
    /**
    *
         * Get bearer token used to authenticate current request.
         
    */
    bearerToken(): any;
    /**
         * Get request host.
         */
    /**
    *
         * Get request host.
         
    */
    getHost(): any;
    /**
         * Get full request host.
         */
    /**
    *
         * Get full request host.
         
    */
    getFullOrigin(): any;
    /**
         * Get request origin.
         */
    /**
    *
         * Get request origin.
         
    */
    getOrigin(): any;
    /**
         * Get request origin protocol.
         */
    /**
    *
         * Get request origin protocol.
         
    */
    getOriginProtocol(): string;
    /**
         * Get request ip address.
         */
    /**
    *
         * Get request ip address.
         
    */
    ip(): any;
    /**
         * Check if path matches.
         */
    /**
    *
         * Check if path matches.
         
    @param {string} path
    */
    pathIs(path: string): boolean;
    /**
         * Check if request matches specified route.
         */
    /**
    *
         * Check if request matches specified route.
         
    @param {string} route
    */
    routeIs(route: string): boolean;
    /**
         * Get url param.
         */
    /**
    *
         * Get url param.
         
    @param {String} name
    */
    param(name: string): any;
    /**
         * Get all url params.
         */
    /**
    *
         * Get all url params.
         
    */
    params(): any;
    /**
         * Get request body.
         */
    /**
    *
         * Get request body.
         
    */
    body(): any;
    /**
         * Get all query and body input.
         */
    /**
    *
         * Get all query and body input.
         
    */
    all(): any;
    /**
         * Get specified input from body.
         */
    /**
    *
         * Get specified input from body.
         
    @param {string|null} key
    */
    input(key?: string | null, default$?: any): any;
    /**
         * Check body/query has key.
         */
    /**
    *
         * Check body/query has key.
         
    @param {string} key
    */
    has(key: string): boolean;
    /**
         * Get key from body/query.
         */
    /**
    *
         * Get key from body/query.
         
    @param {string} key
    */
    get(key: string, default$?: any): any;
    /**
         * Get specified keys from request.
         */
    /**
    *
         * Get specified keys from request.
         
    @param {string[]} keys
    */
    only(keys: string[]): {};
    /**
         * Get specified query.
         */
    /**
    *
         * Get specified query.
         
    @param {string|null} key
    */
    query(key?: string | null, default$?: any): any;
    /**
         * Check if request expects a json response.
         */
    /**
    *
         * Check if request expects a json response.
         
    */
    expectsJson(): boolean;
    /**
         * Validate a request using specified rules.
         */
    /**
    *
         * Validate a request using specified rules.
         
    */
    validate(): any;
    /**
         * Set request rules.
         */
    /**
    *
         * Set request rules.
         
    @param {Array} rules
    */
    setRules(rules: any[]): any[];
    getRules(): any;
    /**
         * Get currently authenticated user.
         */
    /**
    *
         * Get currently authenticated user.
         
    */
    auth(): {
        user: () => any;
        check: () => boolean;
        can: (perform: string) => boolean;
    };
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
