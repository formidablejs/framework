export default class Session {
    /**
    @param {FastifyRequest} request
    */
    constructor(request: FastifyRequest);
    /**
    @param {String} key
    */
    has(key: string): boolean;
    /**
    @param {String} key
    @param {any} default
    */
    get(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    pull(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} value
    */
    set(key: string, value: any): any;
    /**
    @param {String|String[]} key
    */
    forget(key: string | string[]): any[];
    [Ψ__init__]($$?: any): void;
    [Ψref]: any;
}
declare const Ψ__init__: unique symbol;
declare const Ψref: unique symbol;
import type { FastifyRequest } from 'fastify';
export {};
