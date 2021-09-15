export var __esModule: boolean;
export default LoginRequest;
declare const LoginRequest_base: any;
declare class LoginRequest extends LoginRequest_base {
    [x: string]: any;
    authorize(): boolean;
    rules(): {
        email: string;
        password: string;
    };
    persist(): Promise<any>;
}
