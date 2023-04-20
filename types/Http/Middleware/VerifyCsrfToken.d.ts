import { FastifyReply } from 'fastify';
import Repository from '../../Config/Repository';
import FormRequest from '../../Http/Request/FormRequest';

export default class VerifyCsrfToken {
    /**
     * Configuration repository.
     */
    config: Repository;

    /**
     * Add XSRF-TOKEN cookie to response.
     */
    get addHttpCookie(): boolean;

    /**
     * List of URIs that should be excluded from CSRF verification.
     */
    get except(): Array<string>;

    /**
     * Instantiate middleware.
     */
    constructor(config: Repository);

    /**
     * Handle request.
     */
    handle(request: FormRequest, reply: FastifyReply): FormRequest;

    /**
     * Check if request is a read operation.
     */
    isReading(request: FormRequest): boolean;

    /**
     * Check if request should be ignored.
     */
    shouldIgnore(request: FormRequest): boolean;

    /**
     * Check if tokens match.
     */
    tokensMatch(request: FormRequest): boolean;

    /**
     * Get token from request.
     */
    getTokenFromRequest(request: FormRequest): string;

    /**
     * Check if XSRF-TOKEN cookie should be added to response.
     */
    shouldAddXsrfTokenCookie(): boolean;

    /**
     * Add XSRF-TOKEN cookie to response.
     */
    addCookieToResponse(request: FormRequest, reply: FastifyReply): FormRequest;
}
