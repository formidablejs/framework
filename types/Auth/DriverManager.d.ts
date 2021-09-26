export default class DriverManager {
    /**
    @param {String} name
    @param {Object} driver
    */
    static register(name: string, driver: any): any;
    /**
    @param {String} protocol
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    @param {Repository} config
    */
    static get(protocol: string, request: any, reply: any, params: any[] | null, config: any): any;
}
