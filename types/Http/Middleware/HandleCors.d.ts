export = HandleCors;
declare class HandleCors {
    /**
    @param {Object} cors
    */
    static configure(cors: any): any;
    handle(request: any, reply: any): any;
    shouldRun(request: any): boolean;
    isMatchingPath(request: any): boolean;
    run(request: any, reply: any): any;
    getOrigin(request: any): any;
    /**
    @param {String} origin
    */
    getWildcardOrigin(origin: string, request: any): any;
}
