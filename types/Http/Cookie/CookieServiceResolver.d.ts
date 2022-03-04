export default class CookieServiceResolver extends ServiceResolver {
    /**
         * Session config.
         */
    /**
    *
         * Session config.
         
    */
    get config(): {
        secret: any;
        parseOptions: {
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
         * Boot cookie service resolver.
         *
         * @returns {void}
         */
    /**
    *
         * Boot cookie service resolver.
         *
         * @returns {void}
         
    */
    boot(): void;
}
import ServiceResolver from "../../Support/ServiceResolver";
