export default class SessionServiceResolver extends ServiceResolver {
    /**
         * Session config.
         */
    /**
    *
         * Session config.
         
    */
    get config(): {
        secret: any;
        store: any;
        cookieName: any;
        cookie: {
            domain: any;
            httpOnly: any;
            maxAge: any;
            path: any;
            sameSite: any;
            secure: any;
            signed: any;
        };
    };
    /**
         * Boot session service resolver.
         *
         * @returns {void}
         */
    /**
    *
         * Boot session service resolver.
         *
         * @returns {void}
         
    */
    boot(): void;
    /**
    @param {FastifyRequest} request
    @param {FastifyReply} reply
    */
    attemptAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    /**
    @param {FastifyRequest} request
    */
    remove(request: FastifyRequest): void;
}
import ServiceResolver from "../../Support/ServiceResolver";
