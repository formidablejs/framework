export default class HasEncryptionKey {
    /**
    @param {Repository} config
    */
    constructor(config: any);
    config: any;
    /**
    @param {FormRequest} request
    */
    handle(request: any): any;
    key(): any;
}
