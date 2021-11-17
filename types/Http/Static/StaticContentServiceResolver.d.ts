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
        prefix: string;
        decorateReply: boolean;
    };
}
import ServiceResolver from "../../Support/ServiceResolver";
