export default class HasEncryptionKey {
    /**
    @param {Repository} config
    */
    constructor(config: Repository);
    config: Repository;
    /**
    @param {FormRequest} request
    */
    handle(request: FormRequest): FormRequest;
    key(): any;
}
