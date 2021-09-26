export default class Encrypter {
    /**
    @param {String} type
    */
    static appKey(type: string): any;
    static key(): any;
    static iv(): any;
    /**
    @param {any} value
    */
    static encrypt(value: any): string;
    /**
    @param {String} hash
    */
    static decrypt(hash: string): any;
}
