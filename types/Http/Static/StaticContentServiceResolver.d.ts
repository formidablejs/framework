export default class StaticContentServiceResolver extends ServiceResolver {
    /**
         * Public directory.
         */
    /**
    *
         * Public directory.
         
    */
    get public(): {
        root: string;
        wildcard: boolean;
        decorateReply: boolean;
        prefixAvoidTrailingSlash: boolean;
    };
    /**
         * Formidable assets directory.
         */
    /**
    *
         * Formidable assets directory.
         
    */
    get assets(): {
        root: string;
        wildcard: boolean;
        prefix: string;
        decorateReply: boolean;
    };
    /**
         * Register public and formidable assets directories as static content paths.
         *
         * @returns {void}
         */
    /**
    *
         * Register public and formidable assets directories as static content paths.
         *
         * @returns {void}
         
    */
    boot(): void;
}
import ServiceResolver from "../../Support/ServiceResolver";
