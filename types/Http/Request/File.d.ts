export default class File {
    /**
         * Instantiate file instance.
         *
         * @param {object} file
         * @returns {void}
         */
    /**
    *
         * Instantiate file instance.
         *
         * @param {object} file
         * @returns {void}
         
    @param {object} file
    */
    constructor(file: object);
    _object: any;
    /**
         * File name.
         *
         * @type {string}
         */
    /**
    *
         * File name.
         *
         * @type {string}
         
    */
    get name(): string;
    /**
         * File name.
         *
         * @type {string}
         */
    /**
    *
         * File name.
         *
         * @type {string}
         
    */
    get filename(): string;
    /**
         * File encoding.
         *
         * @type {string}
         */
    /**
    *
         * File encoding.
         *
         * @type {string}
         
    */
    get encoding(): string;
    /**
         * File mime type.
         *
         * @type {string}
         */
    /**
    *
         * File mime type.
         *
         * @type {string}
         
    */
    get mime(): string;
    /**
         * File mime type.
         *
         * @type {string}
         */
    /**
    *
         * File mime type.
         *
         * @type {string}
         
    */
    get mimetype(): string;
    /**
         * File mime type.
         *
         * @type {string}
         */
    /**
    *
         * File mime type.
         *
         * @type {string}
         
    */
    get type(): string;
    /**
         * Temp file path.
         *
         * @type {string}
         */
    /**
    *
         * Temp file path.
         *
         * @type {string}
         
    */
    get path(): string;
    /**
         * File extension.
         *
         * @type {string}
         */
    /**
    *
         * File extension.
         *
         * @type {string}
         
    */
    get extension(): string;
    /**
         * File extension.
         *
         * @type {string}
         */
    /**
    *
         * File extension.
         *
         * @type {string}
         
    */
    get ext(): string;
    /**
         * File size in MB.
         *
         * @type {number}
         */
    /**
    *
         * File size in MB.
         *
         * @type {number}
         
    */
    get size(): number;
    /**
         * Move file.
         *
         * @param {string} destination
         * @param {Boolean} overwrite
         * @throws {DestinationExistsException}
         * @returns {void}
         */
    /**
    *
         * Move file.
         *
         * @param {string} destination
         * @param {Boolean} overwrite
         * @throws {DestinationExistsException}
         * @returns {void}
         
    @param {string} destination
    @param {boolean} overwrite
    */
    move(destination: string, overwrite?: boolean): void;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
