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
}
import ServiceResolver from "../../Support/ServiceResolver";
