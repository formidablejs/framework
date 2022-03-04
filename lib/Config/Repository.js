function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#__init__'), $5 = Symbol.for('#__initor__'), $6 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/dotNotation'/*$path$*/));

const settings = {
	environment: null
};

class Repository {
	constructor($$ = null){
		this[$2]($$);
	}
	[$2]($$ = null){
		var $4;
		this.temp = ($$ && ($4 = $$.temp) !== undefined) ? ($4) : {};
		
	}
	
	
	// All of the configuration items.
	get registered(){
		
		return new Object;
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		let tempCheck = $1.default(this.temp,key);
		
		if (tempCheck !== undefined && tempCheck !== null) { return true };
		
		return $1.default(this.registered,key) !== undefined && $1.default(this.registered,key) !== null;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		let tempValue = $1.default(this.temp,key);
		
		if (tempValue !== undefined && tempValue !== null) { return tempValue };
		
		const output = $1.default(this.registered,key);
		
		return (output != null) ? output : default$;
	}
	
	/**
	@param {String} key
	@param {any} value
	*/
	set(key,value){
		
		return this.temp[key] = value;
	}
	
	all(){
		
		return this.registered;
	}
	
	static setEnvironment(){
		
		return settings.environment;
	}
	
	static getEnvironment(){
		
		return settings.environment;
	}
};
exports.default = Repository;
