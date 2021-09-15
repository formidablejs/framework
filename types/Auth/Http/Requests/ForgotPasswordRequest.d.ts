export var __esModule: boolean;
export default ForgotPasswordRequest;
declare const ForgotPasswordRequest_base: any;
declare class ForgotPasswordRequest extends ForgotPasswordRequest_base {
    [x: string]: any;
    authorize(): boolean;
    rules(): {
        email: string;
    };
    persist(): Promise<any>;
}
