export default class HasCsrfToken {
    /**
    @param {Repository} config
    */
    constructor(config: Repository);
    config: Repository;
    /**
    @param {FormRequest} request
    */
    handle(request: FormRequest): any;
    tokens(): any;
}
