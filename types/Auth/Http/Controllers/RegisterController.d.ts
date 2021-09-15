export default RegisterController;
declare class RegisterController extends Controller {
    /**
    @param {Function} handler
    */
    static onRegister(handler: Function): Function;
    static [Ψ__init__](): typeof RegisterController;
    /**
    @param {RegisterRequest} request
    */
    register(request: RegisterRequest, reply: any): any;
}
import Controller from "../../../Http/Controller";
import RegisterRequest from "../Requests/RegisterRequest";
declare const Ψ__init__: unique symbol;
