function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./File'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class FileCollection {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$._object) !== undefined && (this._object = $3);
		($3 = $$._conditions) !== undefined && (this._conditions = $3);
		
	}
	constructor($$ = null){
		this[$__init__$]($$);
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		this._object = ($$ && ($4 = $$._object) !== undefined) ? ($4) : [];
		this._conditions = ($$ && ($4 = $$._conditions) !== undefined) ? ($4) : [];
		
	}
	/**
		 * Count the number of files in the collection.
		 *
		 * @returns {number}
		 */
	
	/**
	*
		 * Count the number of files in the collection.
		 *
		 * @returns {number}
		 
	*/
	get length(){
		
		return this._object.length;
	}
	
	/**
		 * Count the number of files in the collection.
		 *
		 * @returns {number}
		 */
	
	/**
	*
		 * Count the number of files in the collection.
		 *
		 * @returns {number}
		 
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
		 * @param {function} callback
		 * @param {any} _this
		 * @returns {void}
		 */
	
	/**
	*
		 * Performs the specified action for each File in an array.
		 *
		 * @param {function} callback
		 * @param {any} _this
		 * @returns {void}
		 
	@param {function} callback
	@param {null} _this
	*/
	each(callback,_this){
		
		if ($2.default(_this)) { return this._object.forEach(callback,_this) };
		
		return this._object.forEach(callback);
	}
	
	/**
		 * Calls a defined callback function on each File of an array, and returns an array that contains the results.
		 *
		 * @param {function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Calls a defined callback function on each File of an array, and returns an array that contains the results.
		 *
		 * @param {function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 
	@param {function} callback
	@param {null} _this
	*/
	map(callback,_this){
		
		if ($2.default(_this)) { return this._object.map(callback,_this) };
		
		return this._object.map(callback);
	}
	
	/**
		 * Returns the files of an array that meet the condition specified in a callback function.
		 *
		 * @param {function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Returns the files of an array that meet the condition specified in a callback function.
		 *
		 * @param {function} callback
		 * @param {any} _this
		 * @returns {File[]}
		 
	@param {function} callback
	@param {null} _this
	*/
	filter(callback,_this){
		
		if ($2.default(_this)) { return this._object.filter(callback,_this) };
		
		return this._object.filter(callback);
	}
	
	/**
		 * Filter files using the where condition.
		 *
		 * @param {string} key
		 * @param {any} value
		 * @returns {File[]}
		 */
	
	/**
	*
		 * Filter files using the where condition.
		 *
		 * @param {string} key
		 * @param {any} value
		 * @returns {File[]}
		 
	@param {string} key
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
		
		for (let $5 = 0, $6 = iter$__(this._conditions), $7 = $6.length; $5 < $7; $5++) {
			let condition = /**@type {{ key: string, value: any }}*/($6[$5]);
			filtered = filtered.filter(function(file) { return file[condition.key] == condition.value; });
		};
		
		return filtered;
	}
};
exports.default = FileCollection;
