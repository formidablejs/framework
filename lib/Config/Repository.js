function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/dotNotation'/*$path$*/));

const settings = {
	environment: null
};

class Repository {
	[$__patch__$]($$ = {}){
		var $2;
		($2 = $$.temp) !== undefined && (this.temp = $2);
		
	}
	constructor($$ = null){
		this[$__init__$]($$);
	}
	[$__init__$]($$ = null,deep = true){
		var $3;
		this.temp = ($$ && ($3 = $$.temp) !== undefined) ? ($3) : {};
		
	}
	
	
	// All of the configuration items.
	get registered(){
		
		return new Object;
	}
	
	/**
	@param {string} key
	*/
	has(key){
		
		let tempCheck = $1.default(this.temp,key);
		
		if (tempCheck !== undefined && tempCheck !== null) { return true };
		
		return $1.default(this.registered,key) !== undefined && $1.default(this.registered,key) !== null;
	}
	
	/**
	@param {string} key
	@param {any} default
	*/
	get(key,default$){
		
		let tempValue = $1.default(this.temp,key);
		
		if (tempValue !== undefined && tempValue !== null) { return tempValue };
		
		const output = $1.default(this.registered,key);
		
		return (output != null) ? output : default$;
	}
	
	/**
	@param {string} key
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
