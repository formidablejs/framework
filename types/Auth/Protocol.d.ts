export default class Protocol {
    /**
    @param {Repository} config
    */
    static make(config: Repository): Protocol;
    /**
    @param {Repository} config
    */
    constructor(config: Repository);
    config: Repository;
    /**
    @param {string} protocol
    */
    configure(protocol: string): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import Repository from "../Config/Repository";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
