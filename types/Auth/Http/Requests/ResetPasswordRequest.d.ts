export = ResetPasswordRequest;
declare class ResetPasswordRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest = require("../../../Http/Request/FormRequest");
