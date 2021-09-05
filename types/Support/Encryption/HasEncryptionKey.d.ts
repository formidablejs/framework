export = HasEncryptionKey;
declare class HasEncryptionKey {
    constructor(config: any);
    config: any;
    handle(request: any): any;
    key(): any;
}
