function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $_data$ = Symbol.for('#_data'), $_language$ = Symbol.for('#_language'), $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
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
	[$__patch__$]($$ = {}){
		var $9;
		($9 = $$[$_data$]) !== undefined && (this[$_data$] = $9);
		($9 = $$[$_language$]) !== undefined && (this[$_language$] = $9);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $10;
		this[$_data$] = ($$ && ($10 = $$[$_data$]) !== undefined) ? ($10) : {};
		this[$_language$] = $$ ? $$[$_language$] : undefined;
		
	}
	/**
	@param {object} data
	*/
	constructor(data = {}){
		this[$__init__$]();
		if (!($4.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {object}*/ this[$_data$] = data;
	}
	
	get data(){
		
		return this[$_data$];
	}
	
	/**
	@param {object} data
	*/
	setData(data){
		
		if (!($4.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {object}*/ this[$_data$] = Object.assign(this[$_data$],data);
		
		return this;
	}
	
	/**
	@param {Language} language
	*/
	setLanguage(language){
		
		this[$_language$] = language;
		
		return this;
	}
	
	/**
	@param {string} key
	@param {any} default
	*/
	translate(key,default$){
		
		return this[$_language$].get(key,default$);
	}
	
	/**
	@param {string} key
	@param {any} default
	*/
	t(key,default$){
		
		return this.translate(key,default$);
	}
	
	/**
	@param {string} key
	@param {any} default
	*/
	__(key,default$){
		
		return this.translate(key,default$);
	}
	
	/**
	@param {string} key
	@param {any} default
	*/
	old(key,default$){
		var results, $11;
		
		return results = (($11 = $2.default(this[$_data$],("_old." + key))) != null) ? ($11) : (($3.default(default$) ? '' : default$));
	}
	
	/**
	@param {string} key
	@param {any} default
	*/
	session(key,default$){
		var $12;
		
		return (($12 = $2.default(this[$_data$],("_flashed." + key))) != null) ? ($12) : (($3.default(default$) ? '' : default$));
	}
	
	/**
	@param {string} key
	*/
	hasSession(key){
		
		return !($3.default($2.default(this[$_data$],("_flashed." + key))));
	}
	
	/**
	@param {string} key
	*/
	hasError(key){
		
		return !($3.default($2.default(this[$_data$],("_flashed._errors." + key))));
	}
	
	/**
	@param {string} key
	*/
	error(key){
		
		return $2.default(this[$_data$],("_flashed._errors." + key));
	}
	
	/**
	@param {string} property
	@param {any} default
	@param {boolean} escape
	*/
	get(property,default$ = null,escape = true){
		
		if (!($5.default(property))) { throw TypeError("Expected string.") };
		
		const value = $2.default(this[$_data$],property);
		
		if ((value == null || value == undefined) && (default$ == null || default$ == undefined)) {
			
			throw new $7.default('Data prop is undefined.');
		};
		
		if (value) {
			
			return (escape && $5.default(value)) ? $1.escape(value) : value;
		};
		
		return default$;
	}
	
	/**
	@param {string} property
	@param {any} default
	*/
	raw(property,default$ = null){
		
		return this.get(property,default$,false);
	}
	
	/**
	@param {string} property
	*/
	has(property){
		
		if (!($5.default(property))) { throw TypeError("Expected string.") };
		
		return $2.default(this[$_data$],property) != null && $2.default(this[$_data$],property) != undefined;
	}
	
	csrf(){
		
		return ("<input type='hidden' name='_token' value=" + this.get('csrf_token') + ">");
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
