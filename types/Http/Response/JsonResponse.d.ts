import { FastifyReply } from "fastify";

export type JsonData = {
    [key: string]: number | string | Array<number | string | JsonData> | JsonData
}

export default class JsonResponse {
    static make(object: JsonData, statusCode: number): JsonResponse;
    /**
    @param {object} object
    @param {number} statusCode
    */
    constructor(object: object, statusCode?: number);
    data: any;
    statusCode: number;
    /**
    @param {number} statusCode
    */
    code(statusCode?: number): JsonResponse;
    /**
    @param {FastifyReply} reply
    */
    toJson(reply: FastifyReply): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
