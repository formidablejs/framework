function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fs_extraφ = require('fs-extra'/*$path$*/);
var _$fs_extraφ2 = require('fs-extra'/*$path$*/);
var _$fs_extraφ3 = require('fs-extra'/*$path$*/);
var _$DestinationExistsExceptionφ = requireDefault$__(require('./Exceptions/DestinationExistsException'/*$path$*/));

class File {
	[Ψ__init__]($$ = null){
		var vφ;
		this._object = ($$ && (vφ = $$._object) !== undefined) ? (vφ) : {};
		
	}
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
	constructor(file){
		this[Ψ__init__]();
		this._object = file;
	}
	
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
	get name(){
		
		return this._object.filename;
	}
	
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
	get encoding(){
		
		return this._object.encoding;
	}
	
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
	get mime(){
		
		return this._object.mimetype;
	}
	
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
	get mimetype(){
		
		return this._object.mimetype;
	}
	
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
	get path(){
		
		return this._object.filepath;
	}
	
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
	get extension(){
		
		const i = this._object.filepath.lastIndexOf('.');
		
		return (i < 0) ? '' : this._object.filepath.substr(i);
	}
	
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
	get size(){
		var φ;
		
		return (((φ = this._object.file.bytesRead) != null) ? (φ) : 0) / 1048576;
	}
	
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
	storeAs(destination,overwrite = false){
		
		if (!overwrite && _$fs_extraφ.existsSync(destination) && _$fs_extraφ3.statSync(destination).isFile()) {
			
			throw new _$DestinationExistsExceptionφ.default('Destination already exist.');
		};
		
		return _$fs_extraφ2.moveSync(this.path,destination,{overwrite: overwrite});
	}
};
exports.default = File;
