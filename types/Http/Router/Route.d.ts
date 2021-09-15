export default class Route {
    /**
    @param {String} verb
    @param {String} pattern
    @param {Function|[Function, String]} action
    */
    static addRoute(verb: string, pattern: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static delete(path: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static get(path: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static options(path: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static patch(path: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static post(path: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static put(path: string, action: Function | [Function, string]): typeof Route;
    /**
    @param {String} name
    */
    static name(name: string): typeof Route;
    /**
    @param {String|String[]} name
    */
    static middleware(name: string | string[]): typeof Route;
    /**
    @param {Function} callable
    */
    static group(options: Object, callable: Function): void;
    static all(): any[];
}
