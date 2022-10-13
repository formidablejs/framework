export default class VerifyCsrfToken {
    /**
    @param {Repository} config
    */
    constructor(config: Repository);
    get addHttpCookie(): boolean;
    get except(): any[];
    config: Repository;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    handle(request: FormRequest, reply: FastifyReply): FormRequest;
    /**
    @param {FormRequest} request
    */
    isReading(request: FormRequest): boolean;
    /**
    @param {FormRequest} request
    */
    shouldIgnore(request: FormRequest): boolean;
    /**
    @param {FormRequest} request
    */
    tokensMatch(request: FormRequest): any;
    /**
    @param {FormRequest} request
    */
    getTokenFromRequest(request: FormRequest): any;
    shouldAddXsrfTokenCookie(): boolean;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    addCookieToResponse(request: FormRequest, reply: FastifyReply): any;
    /**
    @param {FormRequest} request
    */
    forgetTokens(request: FormRequest): FormRequest;
}

import Repository from "../../Config/Repository";
import FormRequest from "../../Http/Request/FormRequest";
import type { FastifyReply } from "fastify";
