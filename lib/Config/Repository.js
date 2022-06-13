function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#__init__'), $3 = Symbol.for('#__patch__'), $7 = Symbol.for('#__initor__'), $8 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/dotNotation'/*$path$*/));

const settings = {
	environment: null
};

class Repository {
	[$3]($$ = {}){
		var $5;
		($5 = $$.temp) !== undefined && (this.temp = $5);
		
	}
	constructor($$ = null){
		this[$2]($$);
	}
	[$2]($$ = null,deep = true){
		var $6;
		this.temp = ($$ && ($6 = $$.temp) !== undefined) ? ($6) : {};
		
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
