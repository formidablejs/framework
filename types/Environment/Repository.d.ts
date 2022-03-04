export default class Repository {
    /**
    @param {String} root
    */
    constructor(root: string);
    variables: NodeJS.ProcessEnv;
    /**
    @param {String} key
    @param {any} default
    */
    get(key: string, default$?: any): any;
    [$1]($$?: any): void;
}
declare const $1: unique symbol;
export {};
