import { Mailable } from "@formidablejs/mailer";
import Request from "../../Http/Request/Request";
import FormRequest from "../../Http/Request/FormRequest";

type CustomRequest = {
    /**
     * Password reset url.
     */
    passwordResetUrl: string
} & FormRequest

export default class ResetPassword extends Mailable {
    request: CustomRequest
    constructor(request: FormRequest | Request);
    render(): unknown
}
