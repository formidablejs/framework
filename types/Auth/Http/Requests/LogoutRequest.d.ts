export = LogoutRequest;
declare class LogoutRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest = require("../../../Http/Request/FormRequest");
