export default class Hash {
    /**
    @param {string} value
    */
    static make(value: string): Promise<any>;
    /**
    @param {string} value
    @param {string} hash
    */
    static check(value: string, hash: string): Promise<any>;
    /**
    @param {object} config
    */
    static configure(config: object): any;
}
