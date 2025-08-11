export default class FormRequest {
	/**
	 * @param {FastifyRequest} request
	 * @param {object} route
	 * @param {FastifyReply} reply
	 * @param {Repository} config
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
	rules(): Record<string, string | string[]>;
	messages(): {};
	session(): Session;
	cookies(): Cookies;

	/**
	 * Get request locale.
	 */
	locale(): any;

	/**
	 * Get request default locale.
	 */
	defaultLocale(): any;

	/**
	 * Set locale.
	 * @param {string} locale
	 */
	setLocale(locale: string): any;

	/**
	 * Set fallback locale.
	 * @param {string} locale
	 */
	setFallbackLocale(locale: string): any;

	/**
	 * Translate text.
	 * @param {string} path
	 * @param {string} default$
	 */
	translate(path: string, default$: any): any;

	/**
	 * Translate text.
	 * @param {string} path
	 * @param {string} default$
	 */
	t(path: string, default$: any): any;

	/**
	 * Translate text.
	 * @param {string} path
	 * @param {string} default$
	 */
	__(path: string, default$: any): any;

	/**
	 * Flash data.
	 * @param {string} key
	 * @param {any} value
	 */
	flash(key: string, value: any): FormRequest;

	/**
	 * Flash many.
	 * @param {object} object
	 */
	flashMany(object: object): FormRequest;

	/**
	 * Get url signature.
	 */
	signature(): any;

	/**
	 * Get request url.
	 */
	url(): any;

	/**
	 * Get request url without query.
	 */
	urlWithoutQuery(): any;

	/**
	 * Get request url without signature.
	 */
	urlWithoutSignature(): any;

	/**
	 * Get full request url.
	 */
	fullUrl(): any;

	/**
	 * Get request method.
	 */
	method(): any;

	/**
	 * Check if path matches current request path.
	 * @param {string} path
	 */
	isUrl(path: any): boolean;

	/**
	 * Check if path matches current request path.
	 * @param {string} path
	 */
	isFullUrl(path: any): boolean;

	/**
	 * Check if method matches current request method.
	 * @param {string} method
	 */
	isMethod(method: string): boolean;

	/**
	 * Get request headers.
	 */
	headers<T = any>(): T;

	/**
	 * Check if header is present.
	 * @param {string} header
	 */
	hasHeader(header: string): boolean;

	/**
	 * Set request header.
	 * @param {string} header
	 * @param {string} value
	 */
	setHeader(header: string, value: string): FormRequest;

	/**
	 * Set request headers.
	 * @param {object} headers
	 */
	setHeaders(headers: object): FormRequest;

	/**
	 * Get specified header.
	 * @param {string} header
	 */
	header<T = any>(header: string, default$?: T): T;

	/**
	 * Get bearer token used to authenticate current request.
	 */
	bearerToken(): string | null;

	/**
	 * Get request referer.
	 */
	referer(): string | null;

	/**
	 * Get request host.
	 */
	getHost(): string | null;

	/**
	 * Get full request host.
	 */
	getFullOrigin(): string | null;

	/**
	 * Get request origin.
	 */
	getOrigin(): string | null;

	/**
	 * Get request origin protocol.
	 */
	getOriginProtocol(): string;

	/**
	 * Get request ip address.
	 */
	ip(): string | null;

	/**
	 * Check if path matches.
	 * @param {string} path
	 */
	pathIs(path: string): boolean;

	/**
	 * Check if request matches specified route.
	 * @param {string} route
	 */
	routeIs(route: string): boolean;

	/**
	 * Get url param.
	 * @param {string} name
	 */
	param<T = string | number>(name: string): T;

	/**
	 * Get all url params.
	 */
	params<T = any>(): T;

	/**
	 * Get request body.
	 */
	body<T = any>(): T;

	/**
	 * Get body input or specified query keys.
	 * @param {string[]} keys
	 */
	all<T = any>(keys?: string[]): T;

	/**
	 * Get specified input from body.
	 * @param {string|null} key
	 */
	input<K extends keyof ReturnType<this['rules']>>(key?: K | null, default$?: any): any;

	/**
	 * Check body/query has key.
	 * @param {string} key
	 */
	has(key: string): boolean;

	/**
	 * Get specified keys from body.
	 * @param {string[]} keys
	 */
	only<T extends this, K extends keyof ReturnType<T['rules']>>(keys: K[]): { [P in K]: any };

	/**
	 * Get filled input.
	 * @param {string[]} keys
	 */
	filled<T extends this, K extends keyof ReturnType<T['rules']>>(keys: K[]): { [P in K]: any };

	/**
	 * Get specified query.
	 * @param {string|null} key
	 */
	query<T = string | number>(key?: string | null, default$?: any): T

	/**
	 * Get files.
	 * @returns {FileCollection[]|[]}
	 */
	files(): FileCollection[] | [];

	/**
	 * Get file.
	 * @param {string} name
	 * @returns {FileCollection|null}
	 */
	file(name: string): FileCollection | null;

	/**
	 * Check if request has file.
	 * @param {string} name
	 * @returns {Boolean}
	 */
	hasFile(name: string): boolean;

	/**
	 * Check if request expects a json response.
	 * @returns {Boolean}
	 */
	expectsJson(): boolean;

	/**
	 * Check if request expects an html response.
	 * @returns {Boolean}
	 */
	expectsHtml(): boolean;

	/**
	 * Validate a request using specified rules.
	 * @param {object|null} rules
	 */
	validate(rules?: object | null): any;

	/**
	 * Set request rules.
	 * @param {object} rules
	 * @returns {FormRequest}
	 */
	setRules(rules: object): FormRequest;

	/**
	 * Get request rules.
	 * @returns {object}
	 */
	getRules<T = ReturnType<T['rules']>>(): T;

	/**
	 * Get currently authenticated user.
	 */
	auth(): Auth | { user: () => User | null; driver: () => Driver; check: () => boolean; can: (perform: string) => boolean };

	user(): User | null;
	[$__patch__$]($$?: {}): void;
	[$__init__$]($$?: any, deep?: boolean): void;
	[$session$]: any;
	[$cookies$]: any;
}

import Auth from "../../Auth/Auth";
import FileCollection from "./FileCollection";
import Driver from '../../Auth/Drivers/Driver';
import type Repository from "../../Config/Repository";
import type Session from "./Session";
import type Cookies from "./Cookies";
import type { FastifyRequest } from "fastify";
import type { FastifyReply } from "fastify";
import s from "connect-redis";

declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $session$: unique symbol;
declare const $cookies$: unique symbol;

export { };
