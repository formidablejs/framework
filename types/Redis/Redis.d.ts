export default class Redis {
    /**
    @param {String} database
    @param {Object} config
    */
    static connection(database?: string, config?: any): Promise<any>;
    static configure(config: any): any;
    static closeAll(): any[];
    /**
    @param {String} key
    @param {String} value
    @param {any} options
    */
    static set(key: string, value: string, options?: any): Promise<any>;
    /**
    @param {String} key
    */
    static get(key: string): Promise<any>;
    /**
    @param {String} key
    */
    static del(key: string): Promise<any>;
    /**
    @param {String} command
    @param {String} key
    @param {String|null} value
    @param {any} nx
    */
    static command(command: string, key: string, value?: string | null, nx?: any): Promise<any>;
    /**
    @param {String} database
    @param {Object} config
    */
    constructor(database?: string, config?: any);
}
