// export default class Session {
//     /**
//     @param {FastifyRequest} request
//     */
//     constructor(request: FastifyRequest);
//     /**
//     @param {string} key
//     */
//     has(key: string): boolean;
//     /**
//     @param {string} key
//     @param {any} default
//     */
//     get(key: string, default$: any): any;
//     /**
//     @param {string} key
//     @param {any} default
//     */
//     pull(key: string, default$: any): any;
//     /**
//     @param {string} key
//     @param {any} value
//     */
//     set(key: string, value: any): any;
//     /**
//     @param {string|string[]} key
//     */
//     forget(key: string | string[]): any[];
//     [$__patch__$]($$?: {}): void;
//     [$__init__$]($$?: any, deep?: boolean): void;
//     [$ref$]: any;
// }
// declare const $__patch__$: unique symbol;
// declare const $__init__$: unique symbol;
// declare const $ref$: unique symbol;
// export {};

import { FastifyRequest } from 'fastify';

export default class Session {
    /**
     * Fastify request instance.
     */
    #ref: FastifyRequest

    /**
     * Instantiate session.
     */
    constructor(request: FastifyRequest);

    /**
     * Check if session has key.
     */
    has(key: string): boolean;

    /**
     * Get value from session.
     */
    get(key: string, default$: any): any;

    /**
     * Get and forget value from session.
     */
    pull(key: string, default$: any): any;

    /**
     * Set value in session.
     */
    set(key: string, value: any): any;

    /**
     * Forget value/values from session.
     */
    forget(key: string | string[]): any;

    /**
     * Get session csrf token.
     */
    token(): string;
}
