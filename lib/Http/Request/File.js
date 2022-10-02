function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs-extra'/*$path$*/);
var $2 = require('fs-extra'/*$path$*/);
var $3 = require('fs-extra'/*$path$*/);
var $4 = requireDefault$__(require('./Exceptions/DestinationExistsException'/*$path$*/));

class File {
	[$__patch__$]($$ = {}){
		var $5;
		($5 = $$._object) !== undefined && (this._object = $5);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $6;
		this._object = ($$ && ($6 = $$._object) !== undefined) ? ($6) : {};
		
	}
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
	constructor(file){
		this[$__init__$]();
		this._object = file;
	}
	
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
	get name(){
		
		return this._object.filename;
	}
	
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
	get filename(){
		
		return this.name;
	}
	
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
	get encoding(){
		
		return this._object.encoding;
	}
	
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
	get mime(){
		
		return this._object.mimetype;
	}
	
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
	get mimetype(){
		
		return this._object.mimetype;
	}
	
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
	get type(){
		
		return this._object.mimetype;
	}
	
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
	get path(){
		
		return this._object.filepath;
	}
	
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
	get extension(){
		
		const i = this._object.filepath.lastIndexOf('.');
		
		return (i < 0) ? '' : this._object.filepath.substr(i);
	}
	
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
	get ext(){
		
		return this.extension;
	}
	
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
	get size(){
		var $7;
		
		return ((($7 = this._object.file.bytesRead) != null) ? ($7) : 0) / 1048576;
	}
	
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
	move(destination,overwrite = false){
		
		if (!overwrite && $1.existsSync(destination) && $3.statSync(destination).isFile()) {
			
			throw new $4.default('Destination already exist.');
		};
		
		return $2.moveSync(this.path,destination,{overwrite: overwrite});
	}
};
exports.default = File;
