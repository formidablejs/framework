import { Mailable } from "@formidablejs/mailer";
import Request from "../../Http/Request/Request";
import FormRequest from "../../Http/Request/FormRequest";

type CustomRequest = {
    /**
     * Verification url.
     */
    verificationUrl: string
} & FormRequest

export default class VerifyEmail extends Mailable {
    request: CustomRequest
    constructor(request: FormRequest | Request, user: User);
    render(): unknown
}
