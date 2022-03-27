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
    [$1]($$?: any): void;
}
import Repository from "../Config/Repository";
declare const $1: unique symbol;
export {};