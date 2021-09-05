export = Manager;
declare class Manager {
    /**
    @param {String} verb
    @param {String} pattern
    @param {Function|[Function, String]} action
    */
    static addRoute(verb: string, pattern: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static delete(path: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static get(path: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static options(path: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static patch(path: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static post(path: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} path
    @param {Function|[Function, String]} action
    */
    static put(path: string, action: Function | [Function, string]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String} name
    */
    static name(name: string): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        name(name: string): any;
        /**
        @param {String|String[]} name
        */
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {String|String[]} name
    */
    static middleware(name: string | string[]): {
        new (): import("./Manager");
        /**
        @param {String} verb
        @param {String} pattern
        @param {Function|[Function, String]} action
        */
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        delete(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        get(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        options(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        patch(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        post(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} path
        @param {Function|[Function, String]} action
        */
        put(path: string, action: Function | [Function, string]): any;
        /**
        @param {String} name
        */
        name(name: string): any;
        middleware(name: string | string[]): any;
        /**
        @param {Function} callable
        */
        group(options: Object, callable: Function): void;
        all(): any[];
    };
    /**
    @param {Function} callable
    */
    static group(options: Object, callable: Function): void;
    static all(): any[];
}
