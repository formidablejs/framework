export = DriverManager;
declare class DriverManager {
    /**
    @param {String} name
    @param {Object} driver
    */
    static register(name: string, driver: any): any;
    /**
    @param {String} protocol
    */
    static get(protocol: string, request: any, reply: any, params: any, config: any): any;
}
