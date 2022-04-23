function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $9 = Symbol.for('#_data'), $10 = Symbol.for('#_language'), $11 = Symbol.for('#__init__'), $12 = Symbol.for('#__patch__'), $18 = Symbol.for('#__initor__'), $19 = Symbol.for('#__inited__'), $13 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('html-escaper'/*$path$*/);
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isObject'/*$path$*/));
var $5 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $6 = requireDefault$__(require('querystring'/*$path$*/));
var $7 = requireDefault$__(require('./Exceptions/UndefinedDataPropException'/*$path$*/));
var $8 = requireDefault$__(require('../../Support/Language/Language'/*$path$*/));

class View {
	[$12]($$ = {}){
		var $14;
		($14 = $$[$9]) !== undefined && (this[$9] = $14);
		($14 = $$[$10]) !== undefined && (this[$10] = $14);
		
	}
	[$11]($$ = null){
		var $15;
		this[$9] = ($$ && ($15 = $$[$9]) !== undefined) ? ($15) : {};
		this[$10] = $$ ? $$[$10] : undefined;
		
	}
	/**
	@param {Object} data
	*/
	constructor(data = {}){
		this[$11]();
		if (!($4.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {Object}*/ this[$9] = data;
	}
	
	get data(){
		
		return this[$9];
	}
	
	/**
	@param {Object} data
	*/
	setData(data){
		
		if (!($4.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {Object}*/ this[$9] = Object.assign(this[$9],data);
		
		return this;
	}
	
	/**
	@param {Language} language
	*/
	setLanguage(language){
		
		this[$10] = language;
		
		return this;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	translate(key,default$){
		
		return this[$10].get(key,default$);
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	t(key,default$){
		
		return this.translate(key,default$);
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	__(key,default$){
		
		return this.translate(key,default$);
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	old(key,default$){
		var results, $16;
		
		return results = (($16 = $2.default(this[$9],("_old." + key))) != null) ? ($16) : (($3.default(default$) ? '' : default$));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	session(key,default$){
		var $17;
		
		return (($17 = $2.default(this[$9],("_flashed." + key))) != null) ? ($17) : (($3.default(default$) ? '' : default$));
	}
	
	/**
	@param {String} key
	*/
	hasSession(key){
		
		return !($3.default($2.default(this[$9],("_flashed." + key))));
	}
	
	/**
	@param {String} key
	*/
	hasError(key){
		
		return !($3.default($2.default(this[$9],("_flashed._errors." + key))));
	}
	
	/**
	@param {String} key
	*/
	error(key){
		
		return $2.default(this[$9],("_flashed._errors." + key));
	}
	
	/**
	@param {String} property
	@param {any} default
	@param {boolean} escape
	*/
	get(property,default$ = null,escape = true){
		
		if (!($5.default(property))) { throw TypeError("Expected string.") };
		
		const value = $2.default(this[$9],property);
		
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
		
		return $2.default(this[$9],property) != null && $2.default(this[$9],property) != undefined;
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
