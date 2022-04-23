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
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
