export default RegisterController;
declare class RegisterController extends Controller {
    /**
    @param {Function} handler
    */
    static onRegister(handler: Function): Function;
    static [$1](): typeof RegisterController;
    constructor(...args: any[]);
    /**
    @param {RegisterRequest} request
    */
    register(request: RegisterRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import RegisterRequest from "../Requests/RegisterRequest";
declare const $1: unique symbol;
