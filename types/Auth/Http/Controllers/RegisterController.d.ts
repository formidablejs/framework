export var __esModule: boolean;
export default RegisterController;
declare const RegisterController_base: any;
declare class RegisterController extends RegisterController_base {
    [x: string]: any;
    /**
    @param {Function} handler
    */
    static onRegister(handler: Function): Function;
    static [Ψ__init__](): typeof RegisterController;
    /**
    @param {RegisterRequest} request
    */
    register(request: any, reply: any): any;
}
declare const Ψ__init__: unique symbol;
