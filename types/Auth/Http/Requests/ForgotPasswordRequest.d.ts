export = ForgotPasswordRequest;
declare class ForgotPasswordRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest = require("../../../Http/Request/FormRequest");
