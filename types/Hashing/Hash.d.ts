export = Hash;
declare class Hash {
    /**
    @param {String} value
    */
    static make(value: string): Promise<any>;
    /**
    @param {String} value
    @param {String} hash
    */
    static check(value: string, hash: string): Promise<any>;
    /**
    @param {Object} config
    */
    static configure(config: any): any;
}
