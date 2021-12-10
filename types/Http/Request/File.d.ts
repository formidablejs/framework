export default class File {
    /**
         * Instantiate file instance.
         *
         * @param {Object} file
         * @returns {void}
         */
    /**
    *
         * Instantiate file instance.
         *
         * @param {Object} file
         * @returns {void}
         
    @param {Object} file
    */
    constructor(file: any);
    _object: any;
    /**
         * File name.
         *
         * @type {String}
         */
    /**
    *
         * File name.
         *
         * @type {String}
         
    */
    get name(): string;
    /**
         * File encoding.
         *
         * @type {String}
         */
    /**
    *
         * File encoding.
         *
         * @type {String}
         
    */
    get encoding(): string;
    /**
         * File mime type.
         *
         * @type {String}
         */
    /**
    *
         * File mime type.
         *
         * @type {String}
         
    */
    get mime(): string;
    /**
         * File mime type.
         *
         * @type {String}
         */
    /**
    *
         * File mime type.
         *
         * @type {String}
         
    */
    get mimetype(): string;
    /**
         * Temp file path.
         *
         * @type {String}
         */
    /**
    *
         * Temp file path.
         *
         * @type {String}
         
    */
    get path(): string;
    /**
         * File extension.
         *
         * @type {String}
         */
    /**
    *
         * File extension.
         *
         * @type {String}
         
    */
    get extension(): string;
    /**
         * File size in MB.
         *
         * @type {Number}
         */
    /**
    *
         * File size in MB.
         *
         * @type {Number}
         
    */
    get size(): number;
    /**
         * Store file.
         *
         * @param {String} destination
         * @param {Boolean} overwrite
         * @throws {DestinationExistsException}
         * @returns {void}
         */
    /**
    *
         * Store file.
         *
         * @param {String} destination
         * @param {Boolean} overwrite
         * @throws {DestinationExistsException}
         * @returns {void}
         
    @param {String} destination
    @param {Boolean} overwrite
    */
    storeAs(destination: string, overwrite?: boolean): void;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
