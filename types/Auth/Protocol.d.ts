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
    @param {String} protocol
    */
    configure(protocol: string): any;
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
import Repository from "../Config/Repository";
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
