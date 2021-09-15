export default class Redirect {
    /**
    @param {String} path
    */
    static to(path: string): Redirect;
    /**
    @param {String} name
    @param {Object} params
    */
    static route(name: string, params?: any): Redirect;
    /**
    @param {String} path
    @param {Number} statusCode
    */
    constructor(path: string, statusCode?: number);
    path: string;
    statusCode: number;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): Redirect;
}
