function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $8 = Symbol.for('#_data'), $9 = Symbol.for('#__init__'), $10 = Symbol.for('#__patch__'), $16 = Symbol.for('#__initor__'), $17 = Symbol.for('#__inited__'), $11 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('html-escaper'/*$path$*/);
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isObject'/*$path$*/));
var $5 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $6 = requireDefault$__(require('querystring'/*$path$*/));
var $7 = requireDefault$__(require('./Exceptions/UndefinedDataPropException'/*$path$*/));

class View {
	[$10]($$ = {}){
		var $12;
		($12 = $$[$8]) !== undefined && (this[$8] = $12);
		
	}
	[$9]($$ = null){
		var $13;
		this[$8] = ($$ && ($13 = $$[$8]) !== undefined) ? ($13) : {};
		
	}
	/**
	@param {Object} data
	*/
	constructor(data = {}){
		this[$9]();
		if (!($4.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {Object}*/ this[$8] = data;
	}
	
	get data(){
		
		return this[$8];
	}
	
	/**
	@param {Object} data
	*/
	setData(data){
		
		if (!($4.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {Object}*/ this[$8] = Object.assign(this[$8],data);
		
		return this;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	old(key,default$){
		var results, $14;
		
		return results = (($14 = $2.default(this[$8],("_old." + key))) != null) ? ($14) : (($3.default(default$) ? '' : default$));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	session(key,default$){
		var $15;
		
		return (($15 = $2.default(this[$8],("_flashed." + key))) != null) ? ($15) : (($3.default(default$) ? '' : default$));
	}
	
	/**
	@param {String} key
	*/
	hasSession(key){
		
		return !($3.default($2.default(this[$8],("_flashed." + key))));
	}
	
	/**
	@param {String} key
	*/
	hasError(key){
		
		return !($3.default($2.default(this[$8],("_flashed._errors." + key))));
	}
	
	/**
	@param {String} key
	*/
	error(key){
		
		return $2.default(this[$8],("_flashed._errors." + key));
	}
	
	/**
	@param {String} property
	@param {any} default
	@param {boolean} escape
	*/
	get(property,default$ = null,escape = true){
		
		if (!($5.default(property))) { throw TypeError("Expected string.") };
		
		const value = $2.default(this[$8],property);
		
		if ((value == null || value == undefined) && (default$ == null || default$ == undefined)) {
			
			throw new $7.default('Data prop is undefined.');
		};
		
		if (value) {
			
			return (escape && $5.default(value)) ? $1.escape(value) : value;
		};
		
		return default$;
	}
	
	/**
	@param {String} property
	@param {any} default
	*/
	raw(property,default$ = null){
		
		return this.get(property,default$,false);
	}
	
	/**
	@param {String} property
	*/
	has(property){
		
		if (!($5.default(property))) { throw TypeError("Expected string.") };
		
		return $2.default(this[$8],property) != null && $2.default(this[$8],property) != undefined;
	}
	
	beforeRender(){
		
		return null;
	}
	
	afterRender(){
		
		return null;
	}
	
	handle(){
		
		return null;
	}
	
	render(){
		
		return null;
	}
	
	async make(){
		
		await this.handle();
		
		await this.beforeRender();
		
		const response = await this.render();
		
		await this.afterRender();
		
		return String(response);
	}
};
exports.default = View;
