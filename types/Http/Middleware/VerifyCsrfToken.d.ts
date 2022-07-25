import Repository from '../../Config/Repository';
import FormRequest from '../../Http/Request/FormRequest';
import type { FastifyReply } from 'fastify'

export default class VerifyCsrfToken {
    constructor(config: Repository);

    get addHttpCookie(): boolean;

    get except(): any[];

    config: Repository;

    handle(request: FormRequest, reply: FastifyReply): FormRequest;

    isReading(request: FormRequest): boolean;

    shouldIgnore(request: FormRequest): boolean;

    tokensMatch(request: FormRequest): boolean;

    getTokenFromRequest(request: FormRequest): any;

    shouldAddXsrfTokenCookie(): boolean;

    addCookieToResponse(request: FormRequest, reply: FastifyReply): any;

    forgetTokens(request: FormRequest): FormRequest;
}
