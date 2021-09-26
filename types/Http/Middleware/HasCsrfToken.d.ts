export default class HasCsrfToken {
    /**
    @param {Repository} config
    */
    constructor(config: any);
    config: any;
    /**
    @param {FormRequest} request
    */
    handle(request: any): any;
    tokens(): any;
}
