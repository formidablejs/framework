export default class Repository {
    /**
    @param {string} root
    */
    constructor(root: string);
    variables: NodeJS.ProcessEnv;
    /**
    @param {string} key
    @param {any} default
    */
    get(key: string, default$?: any): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
