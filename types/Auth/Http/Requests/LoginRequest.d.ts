export = LoginRequest;
declare class LoginRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest = require("../../../Http/Request/FormRequest");
