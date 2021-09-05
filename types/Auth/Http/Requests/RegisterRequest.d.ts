export = RegisterRequest;
declare class RegisterRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest = require("../../../Http/Request/FormRequest");
