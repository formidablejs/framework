function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Fileφ = requireDefault$__(require('./File'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class FileCollection {
	constructor($$ = null){
		this[Ψ__init__]($$);
	}
	[Ψ__init__]($$ = null){
		var vφ;
		this._object = ($$ && (vφ = $$._object) !== undefined) ? (vφ) : [];
		this._conditions = ($$ && (vφ = $$._conditions) !== undefined) ? (vφ) : [];
		
	}
	/**
		 * Count the number of files in the collection.
		 *
		 * @returns {Number}
		 */
	
	/**
	*
		 * Count the number of files in the collection.
		 *
		 * @returns {Number}
		 
	*/
	get length(){
		
		return this._object.length;
	}
	
	/**
		 * Count the number of files in the collection.
		 *
		 * @returns {Number}
		 */
	
	/**
	*
		 * Count the number of files in the collection.
		 *
		 * @returns {Number}
		 
	*/
	count(){
		
		return this.length;
	}
	
	/**
		 * Push File to collection.
		 *
		 * @returns {File|null}
		 */
	
	/**
	*
		 * Push File to collection.
		 *
		 * @returns {File|null}
		 
	@param {File} file
	*/
	push(file){
		
		this._object.push(file);
		
		return this;
	}
	
	/**
		 * Get first File in the collection.
		 *
		 * @returns {File|null}
		 */
	
	/**
	*
		 * Get first File in the collection.
		 *
		 * @returns {File|null}
		 
	*/
	first(){
		
		if (this.length > 0) { return this._object[0] };
		
		return null;
	}
	
	/**
		 * Get last File in the collection.
		 *
		 * @returns {File|null}
		 */
	
	/**
	*
		 * Get last File in the collection.
		 *
		 * @returns {File|null}
		 
	*/
	last(){
		
		if (this.length > 0) { return this._object[this._object.length - 1] };
		
		return null;
	}
	
	/**
		 * Check if collection has files or not.
		 *
		 * @returns {Boolean}
		 */
	
	/**
	*
		 * Check if collection has files or not.
		 *
		 * @returns {Boolean}
		 
	*/
	hasFiles(){
		
		return this.length > 0;
	}
	
	/**
		 * Performs the specified action for each File in an array.
		 *
		 * @param {Function} callback
		 * @param {any} _this
		 * @returns {void}
		 */
	
	/**
	*
		 * Performs the specified action for each File in an array.
		 *
		 * @param {Function} callback
		 * @param {any} _this
		 * @returns {void}
		 
	@param {Function} callback
	@param {null} _this
	*/
	each(callback,_this){
		
		if (_$isEmptyφ.default(_this)) { return this._object.forEach(callback,_this) };
		
		return this._object.forEach(callback);
	}
	
	/**
		 * Calls a defined callback function on each File of an array, and returns an array that contains the results.
		 *
		 * @param {Function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Calls a defined callback function on each File of an array, and returns an array that contains the results.
		 *
		 * @param {Function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 
	@param {Function} callback
	@param {null} _this
	*/
	map(callback,_this){
		
		if (_$isEmptyφ.default(_this)) { return this._object.map(callback,_this) };
		
		return this._object.map(callback);
	}
	
	/**
		 * Returns the files of an array that meet the condition specified in a callback function.
		 *
		 * @param {Function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Returns the files of an array that meet the condition specified in a callback function.
		 *
		 * @param {Function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 
	@param {Function} callback
	@param {null} _this
	*/
	filter(callback,_this){
		
		if (_$isEmptyφ.default(_this)) { return this._object.filter(callback,_this) };
		
		return this._object.filter(callback);
	}
	
	/**
		 * Filter files using the where condition.
		 *
		 * @param {String} key
		 * @param {any} value
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Filter files using the where condition.
		 *
		 * @param {String} key
		 * @param {any} value
		 * @returns {File[]}
		 
	@param {String} key
	*/
	where(key,value){
		
		this._conditions.push({[key]: value});
		
		return this;
	}
	
	/**
		 * Get files.
		 *
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Get files.
		 *
		 * @returns {File[]}
		 
	*/
	all(){
		
		return this._object;
	}
	
	/**
		 * Get filtered files.
		 *
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Get filtered files.
		 *
		 * @returns {File[]}
		 
	*/
	get(){
		
		let filtered = this._object;
		
		for (let iφ = 0, itemsφ = iter$__(this._conditions), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let condition = /**@type {{ key: String, value: any }}*/(itemsφ[iφ]);
			filtered = filtered.filter(function(file) { return file[condition.key] == condition.value; });
		};
		
		return filtered;
	}
};
exports.default = FileCollection;