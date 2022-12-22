export default class FormRequest {
     /**
     @param {FastifyRequest} request
     @param {object} route
     @param {FastifyReply} reply
     @param {Repository} config
     */
     constructor(request: FastifyRequest, route: object, reply: FastifyReply, config: Repository);
     req: FastifyRequest;
     request: FastifyRequest;
     reply: FastifyReply;
     route: any;
     config: Repository;
     _rules: any;
     get version(): string | null;
     passesAuthorization(): boolean;
     failedAuthorization(): void;
     rules(): {};
     messages(): {};
     session(): Session;
     cookies(): Cookies;
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

     @param {string} locale
     */
     setLocale(locale: string): any;
     /**
          * Set fallback locale.
          */
     /**
     *
          * Set fallback locale.

     @param {string} locale
     */
     setFallbackLocale(locale: string): any;
     /**
          * Translate text.
          */
     /**
     *
          * Translate text.

     @param {string} path
     @param {string} default
     */
     translate(path: string, default$: any): any;
     /**
          * Translate text.
          */
     /**
     *
          * Translate text.

     @param {string} path
     @param {string} default
     */
     t(path: string, default$: any): any;
     /**
          * Translate text.
          */
     /**
     *
          * Translate text.

     @param {string} path
     @param {string} default
     */
     __(path: string, default$: any): any;
     /**
          * Flash data.
          */
     /**
     *
          * Flash data.

     @param {string} key
     @param {any} value
     */
     flash(key: string, value: any): FormRequest;
     /**
          * Flash many.
          */
     /**
     *
          * Flash many.

     @param {object} object
     */
     flashMany(object: object): FormRequest;
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
          * Get request referer.
          */
     /**
     *
          * Get request referer.

     */
     referer(): any;
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

     @param {string} name
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
          * Get body input or specified query keys.
          */
     /**
     *
          * Get body input or specified query keys.

     @param {string[]} keys
     */
     all(keys?: string[]): any;
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
          * Get filled input.
          */
     /**
     *
          * Get filled input.

     @param {string[]} keys
     */
     filled(keys: string[]): {};
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
          * Get files.
          *
          * @returns {FileCollection[]|[]}
          */
     /**
     *
          * Get files.
          *
          * @returns {FileCollection[]|[]}

     */
     files(): FileCollection[] | [];
     /**
          * Get file.
          *
          * @returns {FileCollection|null}
          */
     /**
     *
          * Get file.
          *
          * @returns {FileCollection|null}

     @param {string} name
     */
     file(name: string): FileCollection | null;
     /**
          * Check if request has file.
          *
          * @returns {Boolean}
          */
     /**
     *
          * Check if request has file.
          *
          * @returns {Boolean}

     @param {string} name
     */
     hasFile(name: string): boolean;
     /**
          * Check if request expects a json response.
          *
          * @returns {Boolean}
          */
     /**
     *
          * Check if request expects a json response.
          *
          * @returns {Boolean}

     */
     expectsJson(): boolean;
     /**
          * Check if request expects an html response.
          *
          * @returns {Boolean}
          */
     /**
     *
          * Check if request expects an html response.
          *
          * @returns {Boolean}

     */
     expectsHtml(): boolean;
     /**
          * Validate a request using specified rules.
          */
     /**
     *
          * Validate a request using specified rules.

     @param {object|null} rules
     */
     validate(rules?: object | null): any;
     /**
          * Set request rules.
          *
          * @param {object} rules
          * @returns {FormRequest}
          */
     /**
     *
          * Set request rules.
          *
          * @param {object} rules
          * @returns {FormRequest}

     @param {object} rules
     */
     setRules(rules: object): FormRequest;
     /**
          * Get request rules.
          *
          * @returns {object}
          */
     /**
     *
          * Get request rules.
          *
          * @returns {object}

     */
     getRules(): object;
     /**
          * Get currently authenticated user.
          */
     /**
     *
          * Get currently authenticated user.

     */
     auth(): Auth | {
          user: () => User | null;
          driver: () => Driver;
          check: () => boolean;
          can: (perform: string) => boolean;
     };

     user(): User | null;
     [$__patch__$]($$?: {}): void;
     [$__init__$]($$?: any, deep?: boolean): void;
     [$session$]: any;
     [$cookies$]: any;
}
import Auth from "../../Auth/Auth";
import FileCollection from "./FileCollection";
import Driver from '../../Auth/Drivers/Driver'
import type Repository from "../../Config/Repository";
import type Session from "./Session";
import type Cookies from "./Cookies";
import type { FastifyRequest } from "fastify";
import type { FastifyReply } from "fastify";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $session$: unique symbol;
declare const $cookies$: unique symbol;
export { };
