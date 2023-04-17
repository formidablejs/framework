import csrf from '@fastify/csrf'
import Repository from '../../Config/Repository'
import FormRequest from '../Request/FormRequest'

export default class HasCsrfToken {
    config: Repository;
    constructor(config: Repository);
    handle(request: FormRequest): any;
    tokens(): csrf;
    initCsrfTokens(request: FormRequest);
    createCsrfToken(request: FormRequest): string;
}
