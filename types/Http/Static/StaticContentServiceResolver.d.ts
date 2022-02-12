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
}
import ServiceResolver from "../../Support/ServiceResolver";
