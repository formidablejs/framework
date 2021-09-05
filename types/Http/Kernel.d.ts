export = Kernel;
declare class Kernel {
    get middleware(): any[];
    get middlewareGroups(): {};
    get routeMiddleware(): {};
    getAllMiddleware(route: any): any[];
    listen(config: any, errorHandler: any, hooks: any, testMode: any): Promise<any>;
    hasRoutes(router: any, config: any): any[];
    /**
    @param {Object} route
    */
    resolveMiddleware(route: any, request: any, reply: any, config: any): Promise<any[]>;
}
