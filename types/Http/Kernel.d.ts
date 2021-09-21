/// <reference types="node" />
export default class Kernel {
    get middleware(): any[];
    get middlewareGroups(): {};
    get routeMiddleware(): {};
    getAllMiddleware(route: any): any[];
    listen(config: any, errorHandler: any, hooks: any, plugins: any, returnMode: any): Promise<void | import("fastify").FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify").FastifyLoggerInstance>>;
    hasRoutes(router: any, config: any): any[];
    /**
    @param {Object} route
    */
    resolveMiddleware(route: any, request: any, reply: any, config: any): Promise<any[]>;
}
