export = RegisterController;
declare class RegisterController extends Controller {
    /**
    @param {Function} handler
    */
    static onRegister(handler: Function): Function;
    static [Ψinit](): typeof RegisterController;
    /**
    @param {RegisterRequest} request
    */
    register(request: RegisterRequest, reply: any): any;
}
import Controller = require("../../../Http/Controller");
import RegisterRequest = require("../Requests/RegisterRequest");
declare const Ψinit: unique symbol;
