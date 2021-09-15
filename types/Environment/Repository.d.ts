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
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
