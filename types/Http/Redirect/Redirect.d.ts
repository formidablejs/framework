export = Redirect;
declare class Redirect {
    /**
    @param {String} path
    */
    static to(path: string): import("./Redirect");
    /**
    @param {String} name
    @param {Object} params
    */
    static route(name: string, params?: any): import("./Redirect");
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
    code(statusCode: number): import("./Redirect");
}
