export default RegisterController;
declare class RegisterController extends Controller {
    /**
    @param {Function} handler
    */
    static onRegister(handler: Function): Function;
    static [$__init__$](): typeof RegisterController;
    constructor(...args: any[]);
    /**
    @param {RegisterRequest} request
    */
    register(request: RegisterRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import RegisterRequest from "../Requests/RegisterRequest";
declare const $__init__$: unique symbol;
