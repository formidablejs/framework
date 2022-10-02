export default class Controller {
    /**
         * Throw a 404 exception.
         *
         * @throws {NotFoundException}
         */
    /**
    *
         * Throw a 404 exception.
         *
         * @throws {NotFoundException}
         
    @param {string} message
    */
    notFound(message?: string): void;
    /**
         * Throw a 400 exception.
         *
         * @throws {HttpException}
         */
    /**
    *
         * Throw a 400 exception.
         *
         * @throws {HttpException}
         
    @param {string} message
    */
    badRequest(message?: string): void;
    /**
         * Render a view.
         */
    /**
    *
         * Render a view.
         
    @param {function|View} view
    @param {object} data
    */
    view(view: Function | View, data?: object): ViewResponse;
    /**
         * Validate request.
         */
    /**
    *
         * Validate request.
         
    @param {FormRequest|Request} request
    @param {object} rules
    */
    validate(request: FormRequest | Request, rules?: object): any;
    /**
         * Bind route param.
         */
    /**
    *
         * Bind route param.
         
    @param {string} table
    @param {boolean} first
    */
    bind(table: string, first?: boolean): import("../Database/Bind").default;
}
import ViewResponse from "./Response/ViewResponse";
