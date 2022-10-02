export default class DriverManager {
    /**
    @param {string} name
    @param {object} driver
    */
    static register(name: string, driver: object): any;
    /**
    @param {string} protocol
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    @param {Repository} config
    */
    static get(protocol: string, request: FormRequest, reply: FastifyReply, params: any[] | null, config: Repository): any;
}
