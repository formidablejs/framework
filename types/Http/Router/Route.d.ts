export default class Route {
    /**
    @param {String} verb
    @param {String} pattern
    @param {Function|[Function, String]} action
    */
    static addRoute(verb: string, pattern: string, action: Function | [Function, string]): typeof Route;
    /**
         * Check if route exists.
         */
    /**
    *
         * Check if route exists.
         
    @param {String} name
    */
    static has(name: string): boolean;
    /**
         * Add a get route that renders a view.
         */
    /**
    *
         * Add a get route that renders a view.
         
    @param {String} path
    @param {View} view
    @param {Object} data
    @param {Number|null} statusCode
    */
    static view(path: string, view: View, data?: any, statusCode?: number | null): typeof Route;
    /**
         * Add a delete route.
         */
    /**
    *
         * Add a delete route.
         
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static delete(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a get route.
         */
    /**
    *
         * Add a get route.
         
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static get(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a options route.
         */
    /**
    *
         * Add a options route.
         
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static options(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a patch route.
         */
    /**
    *
         * Add a patch route.
         
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static patch(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a post route.
         */
    /**
    *
         * Add a post route.
         
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static post(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a put route.
         */
    /**
    *
         * Add a put route.
         
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static put(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Set route name.
         */
    /**
    *
         * Set route name.
         
    @param {String} name
    */
    static name(name: string): typeof Route;
    /**
         * Add middleware to route.
         */
    /**
    *
         * Add middleware to route.
         
    @param {String|String[]} name
    */
    static middleware(name: string | string[]): typeof Route;
    /**
         * Add grouped routes.
         */
    /**
    *
         * Add grouped routes.
         
    @param {Function} callable
    */
    static group(options: Object, callable: Function): void;
    static all(): any[];
}
