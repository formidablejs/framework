export default class Encrypter {
    /**
    @param {object} config
    */
    static configure(config: object): typeof Encrypter;
    /**
    @param {string} type
    */
    static appKey(type: string): any;
    static key(): any;
    static iv(): any;
    /**
    @param {any} value
    */
    static encrypt(value: any): string;
    /**
    @param {string} hash
    */
    static decrypt(hash: string): any;
}
