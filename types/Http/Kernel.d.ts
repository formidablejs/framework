export default class Kernel {
    get middleware(): any[];
    get middlewareGroups(): {};
    get routeMiddleware(): {};
    getAllMiddleware(route: any, _middleware?: any): any[];
    listen(config: any, errorHandler: any, interceptors: any, hooks: any, plugins: any, serverConfig: any, returnMode: any): Promise<any>;
    /**
    @param {string} address
    */
    storeAddress(address: string): string;
    hasRoutes(router: any, config: any): any[];
    /**
    @param {object} route
    */
    resolveMiddleware(route: object, request: any, reply: any, config: any, _middleware?: any): Promise<any[]>;
}
