export default class Redis {
    /**
    @param {string} database
    */
    static connection(database?: string): Promise<any>;
    static configure(config: any): any;
    static closeAll(): any[];
    /**
    @param {string} key
    @param {string} value
    @param {any} options
    */
    static set(key: string, value: string, options?: any): Promise<any>;
    /**
    @param {string} key
    */
    static get(key: string): Promise<any>;
    /**
    @param {string} key
    */
    static del(key: string): Promise<any>;
    /**
    @param {string} command
    @param {string} key
    @param {string|null} value
    @param {any} nx
    */
    static command(command: string, key: string, value?: string | null, nx?: any): Promise<any>;
    /**
    @param {string} database
    */
    constructor(database?: string);
}
