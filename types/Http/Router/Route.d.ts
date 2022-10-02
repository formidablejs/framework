export default class Route {
    /**
    @param {string} verb
    @param {string} pattern
    @param {Function|[Function, String]} action
    */
    static addRoute(verb: string, pattern: string, action: Function | [Function, string]): typeof Route;
    /**
         * Check if route exists.
         */
    /**
    *
         * Check if route exists.
         
    @param {string} name
    */
    static has(name: string): boolean;
    /**
         * Add a get route that renders a view.
         */
    /**
    *
         * Add a get route that renders a view.
         
    @param {string} path
    @param {View} view
    @param {object} data
    @param {number|null} statusCode
    */
    static view(path: string, view: View, data?: object, statusCode?: number | null): typeof Route;
    /**
         * Add a delete route.
         */
    /**
    *
         * Add a delete route.
         
    @param {string} path
    @param {Function|[Function, String]} action
    */
    static delete(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a get route.
         */
    /**
    *
         * Add a get route.
         
    @param {string} path
    @param {Function|[Function, String]} action
    */
    static get(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a options route.
         */
    /**
    *
         * Add a options route.
         
    @param {string} path
    @param {Function|[Function, String]} action
    */
    static options(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a patch route.
         */
    /**
    *
         * Add a patch route.
         
    @param {string} path
    @param {Function|[Function, String]} action
    */
    static patch(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a post route.
         */
    /**
    *
         * Add a post route.
         
    @param {string} path
    @param {Function|[Function, String]} action
    */
    static post(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Add a put route.
         */
    /**
    *
         * Add a put route.
         
    @param {string} path
    @param {Function|[Function, String]} action
    */
    static put(path: string, action: Function | [Function, string]): typeof Route;
    /**
         * Set route name.
         */
    /**
    *
         * Set route name.
         
    @param {string} name
    */
    static name(name: string): typeof Route;
    /**
         * Add middleware to route.
         */
    /**
    *
         * Add middleware to route.
         
    @param {string|String[]} name
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
