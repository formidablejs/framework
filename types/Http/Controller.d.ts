import { IView } from "./View/View";
import ViewResponse from "./Response/ViewResponse";
import NotFoundException from "./Exceptions/NotFoundException";
import BadRequestException from "./Exceptions/BadRequestException";
import FormRequest from "./Request/FormRequest";
import Request from "./Request/Request";

export default class Controller {
     /**
      * Throw a 404 exception.
      *
      * @param {string} message
      * @throws {NotFoundException}
      */
     notFound(message?: string): void;

     /**
      * Throw a 400 exception.
      *
      * @param {string} message
      * @throws {BadRequestException}
      */
     badRequest(message?: string): void;

     /**
      * Render a view.
      *
      * @param {IView} view
      * @param {object} data
      */
     view(view: IView, data?: object): ViewResponse;

     /**
      * Validate request.
      *
      * @param {FormRequest|Request} request
      * @param {object} rules
      * @param {Function} callback
      */
     validate(request: FormRequest | Request, rules: object, callback?: Function): void;

     /**
      * Bind route param.
      *
      * @param {string} table
      * @param {boolean} first
      */
     bind(table: string, first?: boolean): import("../Database/Bind").default;
}
